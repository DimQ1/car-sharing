class QueryConverter {
    _convertToMongoParameter(query, key) {
        const parametr = query[key];
        if (!(parametr instanceof Object)) {
            return parametr;
        }
        const mongoParametr = {};
        Object.keys(parametr)
            .forEach((parametrKey) => {
                switch (parametrKey) {
                    case '<':
                        mongoParametr.$lte = parametr[parametrKey];
                        break;
                    case '>':
                        mongoParametr.$gte = parametr[parametrKey];
                        break;
                    default:
                        throw new Error(`${parametrKey} is unknown parameter`);
                }
            });

        return mongoParametr;
    }

    toMongoQuery(query) {
        const mongoQuery = {};

        Object.keys(query)
            .forEach((key) => {
                if ({}.hasOwnProperty.call(query, key)) {
                    mongoQuery[key] = this._convertToMongoParameter(query, key);
                }
            });

        return mongoQuery;
    }
}

module.exports = new QueryConverter();
