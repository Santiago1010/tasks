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
            return {
                data: `Tarea insertada con ID: ${task}`,
                headers: extractedData.headers,
                chars: extractedData.first1000chars
            };
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
                //resolve({ headers: response.headers, first1000chars: body.replace(/<script[^>]*>.*<\/script>/gi, '').replace(/(<([^>]+)>)/ig, "").substring(0, 1000) })
            })
        })
    }

    static async getAll() {
        try {
            let tasks = await database.getTasks();
            return tasks;
        } catch (error) {
            console.error(`Error al obtener todas las tareas: ${error.stack}`)
        }
    }

    static async getTaskById(id) {
        try {
            let task = await database.getTaskById(id);
            return task;
        } catch (error) {
            console.error(`Error al obtener la tarea con ID "${id}" de la base de datos: ${error.stack}`)
        }
    }


}

module.exports = TaskService