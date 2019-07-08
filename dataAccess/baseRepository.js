const queryConverter = require('./queryConverter');

class BaseRepository {
    constructor(model) {
        this.Model = model;
    }

    _convertQuery(query) {
        return queryConverter.toMongoQuery(query);
    }

    create(newModel) {
        const model = new this.Model(newModel);

        return new Promise((resolve, reject) => {
            model.save((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    updateById(id, updateModel) {
        return new Promise((resolve, reject) => {
            this.Model.findByIdAndUpdate(id, updateModel)
                .exec((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
        });
    }

    updateBy(query, updateModel) {
        return new Promise((resolve, reject) => {
            const mongoQuery = this._convertQuery(query);

            this.Model.updateMany(mongoQuery, updateModel)
                .exec((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
        });
    }

    async findByAgregateQuery(query) {
        const { limit, offset, ...findQuery } = query;
        const mongoQuery = this._convertQuery(findQuery.query);

        const cursorData = await this.Model.aggregate(mongoQuery)
            .limit(parseInt(limit || 100, 10))
            .skip(parseInt(offset || 0, 10));

        return cursorData;
    }

    async getAll(query) {
        const { limit, offset, ...findQuery } = query;
        const mongoQuery = this._convertQuery(findQuery);
        const cursorData = await this.Model.find(mongoQuery)
            .limit(parseInt(limit, 10))
            .skip(parseInt(offset, 10));

        return cursorData;
    }

    findById(id, limit) {
        return new Promise((resolve, reject) => {
            this.Model.findById(id)
                .limit(parseInt(limit, 10))
                .exec((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
        });
    }

    findOne(name, limit) {
        return new Promise((resolve, reject) => {
            this.Model.findOne(name)
                .limit(parseInt(limit, 10))
                .exec((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
        });
    }

    deleteById(id) {
        return new Promise((resolve, reject) => {
            this.Model.findByIdAndRemove(id)
                .exec((err) => {
                    if (err) reject(err);
                    resolve(true);
                });
        });
    }

    deleteBy(qurey) {
        return new Promise((resolve, reject) => {
            const mongoQuery = this._convertQuery(qurey);

            this.Model.deleteMany(mongoQuery)
                .exec((err) => {
                    if (err) reject(err);
                    resolve(true);
                });
        });
    }
}

module.exports = BaseRepository;
