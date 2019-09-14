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

    async findByAgregateQuery(query, limit, skip) {
        const mongoQuery = this._convertQuery(query);

        const findResultPromise = this.Model.aggregate(mongoQuery)
            .limit(parseInt(limit, 10))
            .skip(parseInt(skip, 10))
            .sort({ _id: 1 })
            .exec();

        const mongoQueryCount = mongoQuery;

        mongoQueryCount.push(
            {
                $count: 'count'
            }
        );

        const countResultPromise = this.Model.aggregate(mongoQueryCount);

        await Promise.all([findResultPromise, countResultPromise]);

        const findResult = await findResultPromise;
        const countResult = await countResultPromise;

        return { findResult, countResult: countResult.length ? countResult[0].count : 0 };
    }

    async getAll(query, limit, skip) {
        const mongoQuery = this._convertQuery(query);
        const findResultPromise = this.Model.find(mongoQuery)
            .limit(parseInt(limit, 10))
            .skip(parseInt(skip, 10))
            .sort({ _id: 1 })
            .exec();

        const countResultPromise = this.Model.find(mongoQuery)
            .count()
            .exec();

        await Promise.all([findResultPromise, countResultPromise]);

        const findResult = await findResultPromise;
        const countResult = await countResultPromise;

        return { findResult, countResult };
    }

    async findById(id) {
        const findResult = await this.Model.findById(id);

        return findResult;
    }

    async findOne(name) {
        const findResult = await this.Model.findOne(name);

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
