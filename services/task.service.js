const request = require('request')
const database = require('../config/database')
const cronValidator = require('cron-validator');

class TaskService {
    static async pingSiteAndSaveData(url, cron) {
        try {
            // Validate URL
            if (!/^(http|https):\/\/[^ "]+$/.test(url)) {
                throw new Error(`URL "${url}" no es válida.`);
            }

            // Validate cron expression
            if (!cronValidator.isValidCron(cron)) {
                throw new Error(`La expresión cron "${cron}" no es válida.`);
            }

            let extractedData = await this.pingSite(url)
            let task = await database.insertTask(cron, url, extractedData.headers, extractedData.first1000chars)
            console.log(`Tarea insertada con ID: ${task}`)
            return `Tarea insertada con ID: ${task}`
        } catch (error) {
            console.error(`Error al hacer ping a la URL o insertar tarea en la base de datos: ${error.stack}`)
        }
    }

    static pingSite(url) {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) {
                    reject(error)
                }
                resolve({ headers: response.headers, first1000chars: body.substring(0, 1000) })
            })
        })
    }
}

module.exports = TaskService