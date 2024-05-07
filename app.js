const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors')
require("dotenv").config()
const authRouter = require('./routes/auth/index');
const bookStoreRouter = require('./routes/book-store/index');
const googleApiRouter = require('./routes/google-api/index');

const hendleError = require('./middleware/hendle-error');
const guard = require('./middleware/auth/guard');

const domainAllowCSP = [
    'http://localhost:4200'
]
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded());
app.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(32).toString("hex");
    next();
});
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`,...domainAllowCSP],
                frameAncestors: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`,...domainAllowCSP],
                frameSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`,...domainAllowCSP],
                fontSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`,...domainAllowCSP],
                imgSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`,...domainAllowCSP],
                scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`,...domainAllowCSP],
                styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`,...domainAllowCSP],
            },
        },
        xFrameOptions:false
    })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SIGN));
app.use(express.static(path.join(__dirname, 'public')));
app.use(guard);
app.use('/auth/', authRouter);
app.use('/book/', bookStoreRouter);
app.use('/google-api/', googleApiRouter);

app.use(hendleError);

module.exports = app;
