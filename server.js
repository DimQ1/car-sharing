const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const errorHandlerMiddelware = require('./middlewares/errorHandler');
const LoggerFactory = require('./middlewares/loggerFactory');
const logger = require('./common/logger');
const routes = require('./routes');
const notFoundMiddelware = require('./middlewares/notFound');
const { secret } = require('./config');
const { port } = require('./config');

const app = express();
const loggerFactory = new LoggerFactory(logger);

const mongoDB = 'mongodb://localhost/car-sharing';
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt({ secret })
    .unless({ path: ['/login'] }));
app.use(loggerFactory.create('requestLogger'));
app.use('/', routes);
app.use(notFoundMiddelware);
app.use(loggerFactory.create('errorLogger'));
app.use(errorHandlerMiddelware);

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
