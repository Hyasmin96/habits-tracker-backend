## Habits Tracker Backend

Este proyecto es la **API backend** de un rastreador de hábitos, desarrollada con **Node.js**, **Express** y **MongoDB Atlas** usando **Mongoose**. Permite registrar  eliminar y consultar hábitos de manera sencilla.

---

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework para crear APIs REST.
- **MongoDB Atlas**: Base de datos en la nube.
- **Mongoose**: ODM para interactuar con MongoDB.
- **dotenv**: Gestión de variables de entorno.
- **Postman**: Para pruebas de la API.

---

## Instalación

1. Clona el repositorio:
```bash

git clone https://github.com/Hyasmin96/habits-tracker-backend

cd habits-tracker-backend

```

2. Instala las dependencias:
```bash

npm install

```

3. Configura las variables de entorno creando un archivo .env en la raíz del proyecto:
```bash

MONGO_URI=mongodb+srv://hc3826_db_user:X9FU7rw556zDrR6m@cluster0.w66yq2x.mongodb.net/habitosApp?appName=Cluster0
PORT=3001

```

4. Ejecución
```bash

npm start

```

> El backend estará corriendo en: http://localhost:3001/

---

## Endpoints principales

| Método | Ruta          | Descripción               |
| ------ | ------------- | ------------------------- |
| GET    | `/habits`     | Obtener todos los hábitos |
| POST   | `/habits`     | Crear un nuevo hábito     |
| PUT    | `/habits/:id` | (Por completar)           |
| DELETE | `/habits/:id` | Eliminar un hábito        |

> Puedes probarlos usando Postman.

---

## Ejemplos de uso en Postman

**GET - todos los hábitos:**
```http

GET http://localhost:3001/habits

```


**POST - Crear un hábito:**
```http
POST http://localhost:3001/habits

```

```json
{
  "title": "Habito de lectura",
  "description": "Leer diariamente 5 minutos"
}

```

> Haz clic en Send en Postman y verás que el nuevo hábito se agrega a la base de datos.



**DELETE - Eliminar un habito mediante su id:**
```http

DELETE http://localhost:3001/habits/<ID_DEL_HABITO>

```

>Nota: Reemplaza <ID_DEL_HABITO> con el _id real del hábito que deseas eliminar.

---

```text

**Notas adicionales:**

- Para cambiar el puerto, edita la variable PORT en el archivo .env.

- Proyecto utiliza Mongoose para la conexión con MongoDB, garantizando validación de datos y facilidad para crear, leer, actualizar y eliminar hábitos.

- Recomendado usar Postman para probar los endpoints y verificar el funcionamiento del backend.

```
