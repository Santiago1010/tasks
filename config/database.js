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
}

module.exports = new Database()