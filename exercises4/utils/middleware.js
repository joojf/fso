const logger = require('../utils/logger')

const requestLogger = (req, res, next) => {
    logger.info(`Method: ${req.method}`)
    logger.info(`Url: ${req.url}`)
    logger.info(`Body: ${req.body}`)
    next()
}

const tokenExtractor = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        req.token = token
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
}

const unknownEndpoint = (req, res) => {
    res.status(404).send('Unknown endpoint')
}

const errorHandler = (err, req, res, next) => {
    logger.error(err)

    if (err.name === 'ValidationError') {
        res.status(400).send(err.message)
    } else if (err.name === 'JsonWebTokenError') {
        res.status(401).send(err.message)
    }

    res.status(500).send('Internal server error')
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
}
