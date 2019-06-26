class CruidRepository {
    create(Model) {
        return new Promise((resolve, reject) => {
            Model.save((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    update(Model, id, updateModel) {
        return new Promise((resolve, reject) => {
            Model.findByIdAndUpdate(id, updateModel)
                .exec((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
        });
    }

    getAll(Model, limit) {
        return new Promise((resolve, reject) => {
            Model.find({})
                .limit(parseInt(limit, 10))
                .exec((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
        });
    }

    getById(Model, id, limit) {
        return new Promise((resolve, reject) => {
            Model.findById(id)
                .limit(parseInt(limit, 10))
                .exec((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
        });
    }

    find(Model, name, limit) {
        return new Promise((resolve, reject) => {
            Model.find(name)
                .limit(parseInt(limit, 10))
                .exec((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
        });
    }

    deleteById(Model, id) {
        return new Promise((resolve, reject) => {
            Model.findByIdAndRemove(id)
                .exec((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
        });
    }
}

module.exports = new CruidRepository();
