class BaseRepository {
    constructor(model) {
        this.Model = model;
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

    update(id, updateModel) {
        return new Promise((resolve, reject) => {
            this.Model.findByIdAndUpdate(id, updateModel)
                .exec((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
        });
    }

    getAll(query) {
        const { limit, offset, ...findQuery } = query || { limit: null, offset: null };

        return new Promise((resolve, reject) => {
            this.Model.find(findQuery)
                .limit(parseInt(limit, 10))
                .skip(parseInt(offset, 10))
                .exec((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
        });
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
}

module.exports = BaseRepository;
