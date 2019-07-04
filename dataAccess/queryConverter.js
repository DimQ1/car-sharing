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
                        mongoParametr.$lt = parametr[parametrKey];
                        break;
                    case '>':
                        mongoParametr.$gt = parametr[parametrKey];
                        break;
                    case '<=':
                        mongoParametr.$lte = parametr[parametrKey];
                        break;
                    case '>=':
                        mongoParametr.$gte = parametr[parametrKey];
                        break;
                    case 'exists':
                        mongoParametr.$exists = parametr[parametrKey];
                        break;
                    case '!':
                        if (parametr[parametrKey] instanceof Array) {
                            mongoParametr.$not = { $in: parametr[parametrKey] };
                        }
                        else {
                            mongoParametr.$not = { $eq: parametr[parametrKey] };
                        }

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
