const { ServerError } = require('express-easy-helper')

const logErrors = (err, req, res, next) => {
    console.error(err.stack)
    next(err)
}

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
}

const boomErrorHandler = (err, req, res, next) => {
    if (!err.isBoom) return next(err)
        return res.status(err.output.statusCode).json(err.output.payload)
}

module.exports = {
    logErrors,
    errorHandler,
    boomErrorHandler
}