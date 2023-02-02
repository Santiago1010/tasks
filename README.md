# Gestor de tareas y crones

Este es un código de una aplicación de servidor de node.js que utiliza express como framework. La aplicación realiza operaciones CRUD con una base de datos MySQL para almacenar tareas programadas que consisten en hacer un ping a una URL y guardar la respuesta. También se utiliza el paquete node-cron para programar las tareas. Hay rutas definidas para crear una nueva tarea (PUT /ping), obtener todas las tareas (GET /all/tasks), y obtener una tarea específica por ID (GET /task/:id). Además, se han definido algunos middlewares para manejar errores (logErrors, errorHandler, boomErrorHandler).

## API Endpoints
El API de Tasks cuenta con los siguientes endpoints:

### PUT /ping
Este endpoint permite programar una tarea para hacer un ping a una URL específica, la cual se hace según una frecuencia determinada en formato cron.

Ejemplo de request:

```json
PUT /ping
{
    "url": "https://google.com",
    "cron": "* * * * *"
}
```
Ejemplo de respuesta:

```json
200 OK
{
    "data": {
        "id": 1,
        "url": "https://google.com",
        "cron": "* * * * *",
        "extracted_data": null,
        "created_at": "2022-01-01T01:00:00.000Z",
        "updated_at": "2022-01-01T01:00:00.000Z"
    }
}
```

### GET /all/tasks
Este endpoint permite obtener la lista de todas las tareas programadas.

Ejemplo de respuesta:
```json
200 OK
{
    "data": [
        {
            "id": 1,
            "url": "https://google.com",
            "cron": "* * * * *",
            "extracted_data": null,
            "created_at": "2022-01-01T01:00:00.000Z",
            "updated_at": "2022-01-01T01:00:00.000Z"
        },
        {
            "id": 2,
            "url": "https://bing.com",
            "cron": "0 0 * * *",
            "extracted_data": null,
            "created_at": "2022-01-01T01:00:00.000Z",
            "updated_at": "2022-01-01T01:00:00.000Z"
        }
    ]
}
```

###GET /task/:id
Este endpoint permite obtener una tarea específica a partir de su ID.

Ejemplo de respuesta:
```json
200 OK
{
    "data": {
        "id": 1,
        "url": "https://google.com",
        "cron": "* * * * *",
        "extracted_data": null,
        "created_at": "2022-01-01T01:00:00.000Z",
        "updated_at": "2022-01-01T01:00:00.000Z"
    }
}
```

## Tecnologías utilizadas
Tasks utiliza las siguientes tecnologías:

- Node.js
- Express.js
- Handlebars
- MySQL
- node-cron
- request
- cron-validator
- valid-url
- express-easy-helper

##Instalación
Para instalar este proyecto, siga los siguientes pasos:

Clona el repositorio de GitHub en tu máquina local:

```bash
git clone https://github.com/Santiago1010/tasks.git
```


Accede al directorio del proyecto:
```bash
cd [Tu proyecto]
```
Instala las dependencias necesarias para el proyecto:
```bash
npm install
```
Inicia el proyecto:
```bash
npm start
```

¡Eso es todo! El proyecto debería estar funcionando en http://localhost:3000/.

Asegúrate de tener Node.js y npm (viene con Node.js) instalados en tu máquina antes de seguir estos pasos.