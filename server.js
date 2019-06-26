const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const errorHandler = require('./middlewares/errorHandler');
const loggerMidelware = require('./middlewares/logger');
const logger = require('./common/logger');
const routes = require('./routes');
const notFound = require('./middlewares/notFound');
const { secret } = require('./config');
const { port } = require('./config');

const app = express();

const mongoDB = 'mongodb://localhost/car-sharing';
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt({ secret })
    .unless({ path: ['/login'] }));
app.use(loggerMidelware({ logger }));
app.use('/', routes);
app.use(notFound);
app.use(loggerMidelware({ logger, isError: true }));
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
