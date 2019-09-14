module.exports = {
    secret: process.env.SECRET || 'my secret',
    port: process.env.PORT || 3000,
    connectionString: process.env.CONNECTIONSTRING || 'mongodb://localhost/car-sharing'
};
