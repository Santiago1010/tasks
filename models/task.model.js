const connection = require('../config/database')

class Task {
    static async create(cronExpression, url, headers, chars) {
        return new Promise((resolve, reject) => {
            connection.insertTask(ronExpression, url, extractedData)
        })
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.getTasks((error, results) => {
                if (error) {
                    return reject(error)
                }
                return resolve(results)
            })
        })
    }

    static async getOne(id) {
        return new Promise((resolve, reject) => {
            connection.getTaskById(id)
        })
    }

    static async update(id, headers, chars) {
        return new Promise((resolve, reject) => {
            connection.updateTask(JSON.stringify(headers), JSON.stringify(chars), id)
        })
    }
}

module.exports = Task