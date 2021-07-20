const logger = require('../utils/logger')

const requestLogger = (req, res, next) => {
    logger.info(`Method: ${req.method}`)
    logger.info(`Url: ${req.url}`)
    logger.info(`Body: ${req.body}`)
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send('Unknown endpoint')
}

const errorHandler = (err, req, res, next) => {
    logger.error(err)
    res.status(500).send('Internal server error')
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
}
