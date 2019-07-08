const queryConverter = require('./queryConverter');

class BaseRepository {
    constructor(model) {
        this.Model = model;
    }

    _convertQuery(query) {
        return queryConverter.toMongoQuery(query);
    }

    async create(newModel) {
        const model = new this.Model(newModel);
        const createResult = await model.save();

        return createResult;
    }

    async updateById(id, updateModel) {
        const updateResult = await this.Model.findByIdAndUpdate(id, updateModel);

        return updateResult;
    }

    async updateBy(query, updateModel) {
        const mongoQuery = this._convertQuery(query);
        const updateResult = await this.Model.updateMany(mongoQuery, updateModel);

        return updateResult;
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

    async findById(id, limit) {
        const findResult = await this.Model.findById(id)
            .limit(parseInt(limit, 10));

        return findResult;
    }

    async findOne(name, limit) {
        const findResult = await this.Model.findOne(name)
            .limit(parseInt(limit, 10));

        return findResult;
    }

    async deleteById(id) {
        const deleteResult = await this.Model.findByIdAndRemove(id);

        return deleteResult;
    }

    async deleteBy(qurey) {
        const mongoQuery = this._convertQuery(qurey);
        const deleteResult = await this.Model.deleteMany(mongoQuery);

        return deleteResult;
    }
}

module.exports = BaseRepository;
