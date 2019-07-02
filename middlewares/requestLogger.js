const LoggerFactory = require('./loggerFactory');
const logger = require('../common/logger');

const loggerFactory = new LoggerFactory(logger);

module.exports = loggerFactory.create('requestLogger');
