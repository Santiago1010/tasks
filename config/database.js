const mysql = require('mysql')

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'task'
        })
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((error) => {
                if (error) {
                    reject(error)
                } else {
                    console.log('Conectado a la base de datos')
                    resolve()
                }
            })
        })
    }

    insertTask(cronExpression, url, headers, chars) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO tasks (cron_expression, url, extracted_data, headers) VALUES (?, ?, ?, ?)`
            this.connection.query(sql, [cronExpression, url, JSON.stringify(chars), JSON.stringify(headers)], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    console.log(`Tarea insertada con ID: ${results.insertId}`)
                    resolve(results.insertId)
                }
            })
        })
    }

    getTaskById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM tasks WHERE id = ?`
            this.connection.query(sql, [id], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results[0])
                }
            })
        })
    }

    getTasks() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM tasks`
            this.connection.query(sql, (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
        })
    }

    updateTask(id, headers, chars) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE tasks SET headers = ?, extracted_data = ? WHERE id = ?`
            this.connection.query(sql, [JSON.stringify(headers), JSON.stringify(chars), id], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
        })
    }
}

module.exports = new Database()