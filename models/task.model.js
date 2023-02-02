const connection = require('../config/database')

class Task {
    static async create(cronExpression, url, extractedData) {
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

    static async update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query(
                `UPDATE tasks SET extracted_data = ? WHERE id = ?`,
                [data.extracted_data, id],
                (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            )
        })
    }
}

module.exports = Task