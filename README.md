Archivo: userController.js
Integrante: Ariadna Lavizzari

🏛️ Arquitectura del Módulo
Este archivo es el Controlador de Usuarios dentro del patrón MVC (Modelo-Vista-Controlador). Su objetivo exclusivo es gestionar el ciclo de vida del recurso "Usuario". Se encarga de recibir las peticiones HTTP del cliente (req) dirigidas a las rutas de usuarios, interactuar con el modelo específico de la base de datos (Usuario) mediante operaciones asíncronas de Sequelize, y estructurar la respuesta HTTP (res) correspondiente (ya sea confirmando el éxito o devolviendo el error).

⚙️ Consideraciones de Diseño Globales
Gestión de Errores (try/catch): Todas las funciones están envueltas en bloques de manejo de excepciones. Cualquier falla crítica del servidor o de la base de datos devolverá un código de estado 500 para evitar la exposición de datos sensibles del sistema y registrará el problema internamente con un console.log
Seguridad de Datos: En las respuestas de creación (POST) y edición (PUT), los datos devueltos se limpian manualmente en un objeto para evitar la fuga del hash de la contraseña (password), enviando de vuelta únicamente datos seguros (id_usuario, nombre y email)
🌐 Especificación Detallada de Endpoints

1. Registrar un nuevo usuario
   Crea una nueva cuenta de usuario validando previamente que el correo electrónico no se encuentre registrado en el sistema.

Ruta: /usuarios
Método HTTP: POST
Formato del Body requerido (JSON):
{
"nombre": "Carlos Mendoza",
"email": "carlos.mendoza@example.com",
"password": "miPasswordSeguro123"
}
Flujo lógico:
1- Recibe los datos del Body (nombre, email, password).

2- Ejecuta un findOne buscando por duplicado de email en la base de datos.

3- Si lo encuentra: Corta la ejecución inmediatamente y responde con un estado 400 Bad Request.

4- Si no lo encuentra: Ejecuta el método create de Sequelize e inserta los datos.

5- Filtra el objeto resultante para extraer el password y responde con un estado 201 Created junto a los datos limpios.

2. Ver detalle de un usuario
   Busca y recupera la información de un usuario específico en la base de datos utilizando su identificador único.

Ruta: /usuarios/:id
Método HTTP: GET
Parámetros de URL (params): id (Identificador único del usuario).
Flujo lógico:
1- Extrae el id desde los parámetros de la URL.
2- Busca el usuario mediante el método findByPk (buscar por clave primaria) de Sequelize
3- Si no se encuentra (es null): Retorna un estado 404 Not Found con un mensaje de error.
4- Si se encuentra: Retorna un estado 200 OK junto con el objeto completo del usuario. 3. Editar datos de un usuario
Actualiza los datos de un usuario ya existente. Permite modificar campos individuales o todos a la vez, manteniendo los valores anteriores si no se envía algo nuevo.

Ruta: /usuarios/:id
Método HTTP: PUT
Parámetros de URL (params): id
Formato del Body requerido (JSON): (Campos opcionales)
{
"nombre": "Carlos Mendoza Modificado",
"email": "nuevo_email@mail.com"
}
Flujo Lógico:
1- Busca el usuario original en la base de datos por su id. Si no existe, corta y retorna un estado 404 Not Found.
2- Si se intenta cambiar el email, realiza un findOne para verificar si ese correo ya está registrado.
3- validación Antiduplicados: Si encuentra el email, comprueba que el ID del dueño de ese correo diferente al del usuario que está editando (emailDuplicado.id_usuario !== usuarioOriginal.id_usuario). Si es diferente, corta devolviendo un estado 400 Bad Request porque el email le pertenece a otra persona.
4- Si pasa la validación, ejecuta el método update usando el operador lógico || para mantener los datos viejos si en el body no vino nada nuevo.
5- Imprime un [FLAG] en la consola del servidor y responde con un estado 200 OK enviando el usuario actualizado sin la contraseña. 4. Eliminar Cuenta
Borra de forma física y definitiva el registro de un usuario en la base de datos tras verificar su existencia.

Ruta: /usuarios/:id
Método HTTP: DELETE
\*\*Parámetros de URL (params): id
Flujo Lógico:
1- Comprueba si el usuario existe en la base de datos usando el id mediante findByPk
2- Si no existe: Corta la ejecución devolviendo un estado 404 Not Found
3- Si existe: Llama al método destroy de Sequelize sobre la instancia encontrada para borrar el registro de la tabla de manera definitiva.
4- Retorna un estado 200 OK con un mensaje confirmando que la eliminación fue correcta.
🧪 Pruebas de Integración en Postman (Simuladas)
Esta sección replica el comportamiento exacto de la API al ser testeada desde Postman, detallando los encabezados, cuerpos de petición y las respuestas del servidor para cada escenario (exitoso y fallido).

1. POST /usuarios (Registro)
   Caso A: Registro Exitoso
   Status: 201 Created
   Body (raw JSON):
   {
   "nombre": "Carlos Mendoza",
   "email": "carlos.mendoza@example.com",
   "password": "miPasswordSeguro123"
   }
   Response (JSON):
   {
   "msg": "Usuario registrado con éxito",
   "user": {
   "id_usuario": 1,
   "nombre": "Carlos Mendoza",
   "email": "carlos.mendoza@example.com"
   }
   }
   Caso B: Intento con Email Duplicado
   Status: 400 Bad Request
   Body (raw JSON):
   {
   "nombre": "Carlos Mendoza",
   "email": "carlos.mendoza@example.com",
   "password": "otraContraseña"
   }
   Response (JSON):
   {
   "msg": "El correo electrónico carlos.mendoza@example.com ya está registrado"
   }
2. GET /usuarios/:id (Ver Detalle)
   Caso A: ID Existente
   Params: id = 1
   Status: 200 OK
   Response (JSON):
   {
   "msg": "Usuario encontrado con éxito",
   "user": {
   "id_usuario": 1,
   "nombre": "Carlos Mendoza",
   "email": "carlos.mendoza@example.com",
   "password": "miPasswordSeguro123",
   "createdAt": "2026-06-16T12:00:00.000Z",
   "updatedAt": "2026-06-16T12:00:00.000Z"
   }
   }
   Caso B: ID Inexistente
   Params: id = 999
   Status: 404 Not Found
   Response (JSON):
   {
   "msg": "No existe el usuario con el id 999"
   }
3. PUT /usuarios/:id (Editar Datos)
   Caso A: Edición Exitosa (Cambio de Nombre)
   Params: id = 1
   Status: 200 OK
   Body (raw JSON):
   {
   "nombre": "Carlos A. Mendoza"
   }
   Response (JSON):
   {
   "msg": "Usuario modificado con éxito",
   "user": {
   "id_usuario": 1,
   "nombre": "Carlos A. Mendoza",
   "email": "carlos.mendoza@example.com"
   }
   }
   Caso B: Conflicto de Email (Intento de usar el mail de otro)
   Params: id = 1
   Status: 400 Bad Request
   Body (raw JSON):
   {
   "email": "elena.gomez@example.com"
   }
   Response (JSON):
   {
   "msg": "El correo electrónico elena.gomez@example.com ya está en uso por otro usuario."
   }
4. DELETE /usuarios/:id (Eliminar Cuenta)
   Caso A: Eliminación Exitosa
   Params: id = 1
   Status: 200 OK
   Response (JSON):
   {
   "msg": "El usuario con id: 1 fue eliminado correctamente"
   }
   Caso B: Eliminar ID que no existe
   Params: id = 1 (intentando borrarlo de nuevo)
   Status: 404 Not Found
   Response (JSON):
   {
   "msg": "No se puede eliminar: No existe el usuario con id 1"
   }

## INTEGRANTE: SUROP MAITENA

## coleccionUsuarioController,coleccionUsuarioRoutes,index,userRoutes

## CONTROLADORES - coleccionUsuarioController

Este controlador se encarga de modificar y eliminar videojuegos de la colección de un usuario. Primero busca el registro correspondiente en la tabla intermedia ColeccionUsuario, verifica que exista y luego utiliza los métodos update() o destroy() de Sequelize. Además, maneja distintos códigos HTTP como 200 para éxito, 404 cuando el recurso no existe y 500 en caso de errores internos.

## Función `actualizarJuegoColeccion`

        // ------- PUT /coleccion/:id_usuario/:id_videojuego (3. Actualizar) --------//

Esta función permite modificar la información de un videojuego perteneciente a la colección de un usuario. A partir del identificador del usuario y del videojuego, se busca el registro correspondiente en la base de datos y, en caso de existir, se actualizan los datos proporcionados en la solicitud, como el estado, la calificación y el tiempo de juego. Además, se contemplan situaciones en las que el videojuego no se encuentre en la colección y posibles errores internos del servidor, devolviendo las respuestas HTTP correspondientes.

## Función `eliminarJuegoColeccion`

        // ------- DELETE /coleccion/:id_usuario/:id_videojuego (4. Eliminar) --------//

Esta función permite eliminar un videojuego de la colección de un usuario. A partir del identificador del usuario y del videojuego recibido en la solicitud, se busca el registro correspondiente en la base de datos y, si existe, se elimina de la colección. Además, la función contempla la validación de existencia del registro y el manejo de posibles errores, devolviendo las respuestas HTTP adecuadas según el resultado de la operación.

## module.exports

    module.exports = {
    actualizarJuegoColeccion,
    eliminarJuegoColeccion
    };

Exporto ambas funciones para que puedan ser utilizadas desde otros archivos, en este caso desde coleccionUsuarioRoutes.js, que es donde se asocian estas funciones a las rutas PUT y DELETE.

## RUTAS - coleccionUsuarioRoutes,index,userRoutes

    coleccionUsuarioRoutes

Este archivo es el enrutador de la colección. Su función es conectar cada endpoint con la función del controlador que contiene la lógica.

## Importación de Express

    const express = require("express");
    const router = express.Router();

Importo Express y creo un objeto router, que sirve para definir las rutas relacionadas con la colección de usuarios.
De esta forma puedo separar las rutas en distintos archivos y mantener el proyecto organizado.

## Importación de las funciones del controlador

    const {
    agregarAColeccion,
    obtenerColeccionUsuario,
    actualizarJuegoColeccion,
    eliminarJuegoColeccion,
    } =

Importo las funciones definidas en coleccionUsuarioController.js.
Cada una contiene la lógica necesaria para realizar una acción sobre la colección.

agregarAColeccion: agrega un juego.

obtenerColeccionUsuario: muestra la colección de un usuario.

actualizarJuegoColeccion: modifica un juego de la colección.

eliminarJuegoColeccion: elimina un juego de la colección.

## RUTA - PUT

    router.put("/:id_usuario/:id_videojuego", actualizarJuegoColeccion);

Define una ruta PUT.
Por ejemplo:

/coleccion/1/5

donde:
1 es el id del usuario.  
5 es el id del videojuego.  
Esta ruta llama a actualizarJuegoColeccion, que se encarga de modificar los datos del juego, como el estado, la calificación o el tiempo de juego.

## RUTA - DELETE

    router.delete("/:id_usuario/:id_videojuego", eliminarJuegoColeccion);

Define una ruta DELETE.
Por ejemplo:

/coleccion/1/5

Esta petición ejecuta la función eliminarJuegoColeccion, encargada de borrar ese videojuego de la colección del usuario.

## Exportación

    module.exports = router;

Exporto el objeto router para que pueda ser utilizado desde otros archivos, particularmente desde routes/index.js, donde se conectan todas las rutas de la aplicación.

Este archivo corresponde al enrutador de la colección. Su función es asociar cada endpoint HTTP con la función del controlador correspondiente. Utilicé los métodos put y delete de Express para definir las operaciones de actualizar y eliminar videojuegos de la colección de un usuario. Finalmente exporto el router para que pueda ser utilizado por el servidor principal.

## RUTAS - INDEX

Este archivo es el enrutador principal de la aplicación. Su función es centralizar todas las rutas y derivar cada petición al módulo correspondiente.

## Importación de Express y creación del router

    const express = require('express');
    const router = express.Router();

Importo Express y creo un objeto router, que se va a encargar de administrar todas las rutas de la API.

## Importación de los routers específicos

    const coleccionRoutes = require('./coleccionUsuarioRoutes');
    const videojuegoRoutes = require('./videojuegoRoutes');
    const userRoutes = require('./userRoutes');

## Importo los routers de cada módulo.

    coleccionRoutes: contiene las rutas relacionadas con la colección de videojuegos.
    videojuegoRoutes: contiene las rutas relacionadas con videojuegos.
    userRoutes: contiene las rutas relacionadas con usuarios.

La idea es separar las responsabilidades y mantener el código más organizado.

## Asociación de rutas con router.use()

    router.use('/coleccion', coleccionRoutes);

Indica que todas las rutas definidas en coleccionUsuarioRoutes.js van a comenzar con:

/coleccion

Por ejemplo:
POST /coleccion
GET /coleccion/:id_usuario
PUT /coleccion/:id_usuario/:id_videojuego
DELETE /coleccion/:id_usuario/:id_videojuego

    router.use('/videojuegos', videojuegoRoutes);

Asocia las rutas de videojuegos al prefijo:
/videojuegos

    router.use('/usuarios', userRoutes);

Asocia las rutas de usuarios al prefijo:
/usuarios

## Exportación del router

    module.exports = router;

Exporto este router principal para que pueda ser utilizado por server.js.
En server.js se encuentra:

    app.use('/api', routes);

por lo tanto, todas las rutas anteriores tendrán el prefijo /api.
Por ejemplo:
/api/usuarios
/api/videojuegos
/api/coleccion

## RUTAS - userRoutes

Creé el archivo userRoutes.js porque existía el controlador de usuarios con las funciones para registrar, consultar, modificar y eliminar usuarios, pero faltaba definir las rutas que permitieran acceder a esas funciones. En este archivo asocié cada endpoint con su controlador utilizando Express Router.

    router.post("/", registrarUsuario);
    router.get("/:id", obtenerUsuarioPorId);
    router.put("/:id", actualizarUsuario);
    router.delete("/:id", eliminarUsuario);

Y después, desde routes/index.js, conecte ese router mediante:

    router.use('/usuarios', userRoutes);

Gracias a eso las peticiones quedan disponibles como:
/api/usuarios
/api/usuarios/1

# INTEGRANTE: FEDERICA VIGNALES

## Archivos trabajados

- videojuegoController.js
- videojuegoRoutes.js
- coleccionUsuarioController.js
- coleccionUsuarioRoutes.js

## CONTROLADORES

### videojuegoController.js

En este controlador trabajé sobre la funcionalidad de consulta de videojuegos.

#### Función obtenerVideojuegoPorId

```js
// GET /videojuegos/:id
```

Esta función permite obtener la información de un videojuego específico a partir de su ID.

Primero recibe el id desde los parámetros de la URL y luego utiliza `findByPk()` para buscar ese videojuego en la base de datos.

Si no existe ningún videojuego con ese id, devuelve un error 404 informando que no fue encontrado.

Si el videojuego existe, devuelve un código 200 junto con los datos del juego.

En caso de que se genere algún error durante la consulta, se captura mediante un bloque `try/catch` y se devuelve un error 500.

---

### coleccionUsuarioController.js

En este controlador trabajé sobre las funcionalidades de agregar videojuegos a la colección de un usuario y consultar la colección de un usuario.

#### Función agregarAColeccion

```js
// POST /coleccion
```

Esta función permite agregar un videojuego a la colección de un usuario.

Primero recibe desde el body: id_usuario, id_videojuego, estado, calificación y tiempo_juego.

Antes de crear el registro se realizan varias validaciones:

- Se verifica que el usuario exista.
- Se verifica que el videojuego exista.
- Se verifica que ese videojuego no haya sido agregado previamente por el mismo usuario.

Si alguna de estas validaciones falla, se devuelve el mensaje de error correspondiente.

Si todas las validaciones son correctas, se crea el registro en la tabla `Coleccion-usuario` utilizando `create()`.

Finalmente se devuelve un código 201 indicando que el juego fue agregado correctamente.

---

#### Función obtenerColeccionUsuario

```js
// GET /coleccion/:id_usuario
```

Esta función permite visualizar todos los videojuegos que pertenecen a la colección de un usuario.

Recibe el id del usuario desde los parámetros de la URL y busca todos los registros asociados a ese usuario dentro de la tabla `Coleccion-usuario`.

Además, mediante `include`, incorpora automáticamente la información de cada videojuego relacionado para que la respuesta sea más completa.

Si la consulta se realiza correctamente devuelve un código 200 junto con la colección encontrada.

Si ocurre algún error se devuelve un código 500.

---

# RUTAS

## videojuegoRoutes.js

Este archivo contiene las rutas relacionadas con los videojuegos.

```js
router.get("/:id", obtenerVideojuegoPorId);
```

Esta ruta permite consultar un videojuego específico utilizando su id.

Ejemplo:

```http
GET /api/videojuegos/1
```

---

## coleccionUsuarioRoutes.js

Este archivo contiene las rutas relacionadas con la colección de videojuegos.

### Ruta POST

```js
router.post("/", agregarAColeccion);
```

Permite agregar un videojuego a la colección de un usuario.

Ejemplo:

```http
POST /api/coleccion
```

---

### Ruta GET

```js
router.get("/:id_usuario", obtenerColeccionUsuario);
```

Permite obtener todos los videojuegos que tiene registrados un usuario en su colección.

Ejemplo:

```http
GET /api/coleccion/1
```

---

# Carga inicial de datos (Seeders)

**Desarrollado por:** Renata Turani

En esta sección del proyecto me encargue de armar los seeders usando Sequelize. Mi trabajo fue crear tres scripts que le inyectan datos de prueba a nuestra base de datos de forma automatica. Creando asi 2 usuarios, 3 videojuegos y 3 colecciones distintas. 

---

## Tecnologias y herramientas utilizadas
* **Node.js**
* **Sequelize** 
* **PostgreSQL** (base de datos en la nube via Neon)

---

Archivos utilizados: 
1. **`Demo-Usuarios`: En este archivo se cargan usuarios base al sistema; definiendo su `nombre`, `email` y `password`. El ID es manejado de manera autoincremental por el motor de base de datos.
2. **`Demo-Videojuegos`: Genera 3 videojuegos distintos con todos sus atributos requeridos (`titulo`, `genero`, `plataforma`, `precio`, `descripcion` y `desarrollador`).
3. **`Demo-Colecciones`:** Esta es la tabla intermedia que vincula a los usuarios con los videojuegos. Simula un uso real de la aplicación agregando datos especificos de la interaccion, como el `tiempo_jugado`, la `calificacion` y el `estado` del juego.

Ademas cada tabla tiene dos "atributos" adicionales; createdAt y updatedAt, que son campos obligatorios que nos exige sequelize por defecto. Sirven para dejar un registro automatico de la fecha y hora exacta en la que se creo o se modifico un dato. Los agregue utilizando la función new Date() en cada uno de los registros para cumplir con la estructura de la tabla y que la base de datos no tire error al momento de insertar la informacion.

---

### Paso 1: Cree los tres archivos de los seeders usando la terminal de bash con los comandos:
npx sequelize-cli seed:generate --name demo-usuarios (para el archivo demo-usuarios)
npx sequelize-cli seed:generate --name demo-videojuegos (para el archivo demo-videojuegos)
npx sequelize-cli seed:generate --name demo-colecciones (para el archivo demo-colecciones)
Lo hice de esta forma porque al usar esos comandos, sequelize le asigna automáticamente un timestamp (una marca de tiempo con la fecha y hora exacta) como prefijo al nombre del archivo. Esto es fundamental para que los archivos se ejecuten en el orden correcto (primero los usuarios, despues los juegos, y al final la tabla que los une), asi la base de datos no tira errores por intentar usar un dato que todavia no existe.

### Paso 2: Elimine el contenido predeterminado de los tres archivos, y luego en cada uno utilice "up" y `bulkInsert` que es un metodo de sequelize para cargar los datos. En lugar de ejecutar multiples consultas individuales a la base de datos (lo que sobrecargaria el sistema), `bulkInsert` me permitio agrupar todos los registros en un arreglo e insertarlos en una unica operación.

Ademas, cree una funcionalidad adicional inversa utilizando "down" y bulkdelete, para vaciar las tablas y "arrancar de 0" en caso de que lo necesitemos con mi grupo.

### Paso 3: Por ultimo, envie los datos que cargue a la base de datos que se encuentra en Neon, asegurandome de que mi compañero ya habria creado las migraciones para evitar errores. Lo hice usando el comando:
npx sequelize-cli db:seed:all

---

## **Integrante:** Tomás Mertian

**Archivos:** `Usuario.ts` · `Videojuegos.ts` · `ColeccionUsuario.ts` · `index.ts`

---

## 🏛️ Arquitectura del Módulo

Este módulo implementa la capa de datos de la aplicación de colección de videojuegos utilizando Sequelize ORM con TypeScript sobre PostgreSQL. Está compuesto por tres modelos principales (`Usuario`, `Videojuego` y `ColeccionUsuario`) y un archivo de inicialización (`index.ts`) que centraliza la conexión a la base de datos y define las relaciones entre modelos.

---

## 📄 Archivo: `Usuario.ts`

### Descripción
Define el modelo Sequelize que representa a los usuarios de la plataforma. Mapea la tabla `Users` de PostgreSQL e incluye validaciones de formato de email y restricción de unicidad.

### Interfaces TypeScript

#### `UsuarioAttributes`
Define la forma del objeto de datos completo del usuario:
```ts
id_usuario: number   // Clave primaria autoincremental
nombre: string       // Nombre del usuario (máx. 100 chars)
email: string        // Email único con validación de formato
password: string     // Contraseña hasheada (máx. 255 chars)
```

#### `UsuarioCreationAttributes`
Extiende `UsuarioAttributes` con `Partial<>`, haciendo **todos** los campos opcionales en tiempo de compilación. Esto permite que TypeScript no exija ningún campo al instanciar el modelo; las restricciones reales de nulabilidad (`allowNull: false`) las enforcea Sequelize en runtime contra la base de datos.

### Definición del Modelo — `Usuario.init()`

| Campo | Tipo Sequelize | Restricciones / Opciones | Notas |
|---|---|---|---|
| `id_usuario` | `INTEGER` | `autoIncrement: true`, PK | |
| `nombre` | `STRING(100)` | `allowNull: false` | |
| `email` | `STRING(255)` | `allowNull: false`, `unique: true` | `validate: isEmail` |
| `password` | `STRING(255)` | `allowNull: false` | |

### Configuración del Modelo
- `modelName`: `"Usuario"`
- `tableName`: `"Users"`
- `timestamps: true` → Sequelize agrega automáticamente `createdAt` y `updatedAt`

---

## 📄 Archivo: `Videojuegos.ts`

### Descripción
Define el modelo que representa el catálogo de videojuegos disponibles en la plataforma. Mapea la tabla `Videojuegos` y almacena información descriptiva y comercial de cada título.

### Interfaces TypeScript

#### `VideojuegoAttributes`
Forma del objeto completo del videojuego:
```ts
id_videojuego: number  // Clave primaria autoincremental
titulo: string         // Título del juego (máx. 200 chars, obligatorio)
genero: string         // Género (ej: RPG, Acción)
plataforma: string     // Plataforma (ej: PC, PS5)
desarrollador: string  // Nombre del estudio (máx. 200 chars)
descripcion: string    // Descripción larga (TEXT)
precio: number         // Precio con dos decimales (DECIMAL 10,2)
```

#### `VideojuegoCreationAttributes`
Extiende `VideojuegoAttributes` con `Partial<>`, haciendo **todos** los campos opcionales en tiempo de compilación. Solo `titulo` tiene restricción real de nulabilidad (`allowNull: false`), que Sequelize enforcea en runtime.

### Definición del Modelo — `Videojuego.init()`

| Campo | Tipo Sequelize | Restricciones / Opciones | Notas |
|---|---|---|---|
| `id_videojuego` | `INTEGER` | `autoIncrement: true`, PK | |
| `titulo` | `STRING(200)` | `allowNull: false` | |
| `genero` | `STRING(100)` | Opcional | |
| `plataforma` | `STRING(100)` | Opcional | |
| `desarrollador` | `STRING(200)` | Opcional | |
| `descripcion` | `TEXT` | Opcional | |
| `precio` | `DECIMAL(10,2)` | Opcional | |

### Configuración del Modelo
- `modelName`: `"Videojuego"`
- `tableName`: `"Videojuegos"`
- `timestamps: true` → Agrega `createdAt` y `updatedAt` automáticamente

---

## 📄 Archivo: `ColeccionUsuario.ts`

### Descripción
Implementa la tabla intermedia de la relación muchos-a-muchos entre `Usuario` y `Videojuego`. Además de las claves foráneas, extiende la relación con atributos propios que registran el estado de juego del usuario para cada título de su colección.

### Enum: `EstadoJuego`
Define los estados posibles de un videojuego dentro de la colección:
```ts
JUGANDO     = 'jugando'
EN_PROGRESO = 'en_progreso'
COMPLETADO  = 'completado'
```

### Definición del Modelo — `ColeccionUsuario.init()`

| Campo | Tipo Sequelize | Restricciones / Opciones | Notas |
|---|---|---|---|
| `id_usuario` | `INTEGER` | PK compuesta + FK → `Users` | |
| `id_videojuego` | `INTEGER` | PK compuesta + FK → `Videojuegos` | |
| `estado` | `STRING(50)` | `defaultValue: EstadoJuego.EN_PROGRESO` | Almacena los valores del enum `EstadoJuego` como string; no usa `ENUM` nativo de PostgreSQL |
| `calificacion` | `FLOAT` | `min: 1`, `max: 10` | `validate: isFloat` |
| `tiempo_jugado` | `INTEGER` | `defaultValue: 0` | Minutos u horas jugados |

### Clave Primaria Compuesta
La tabla usa una PK compuesta por los dos campos de referencia: la combinación `(id_usuario, id_videojuego)` identifica unívocamente cada entrada en la colección, evitando duplicados del mismo juego para el mismo usuario.

### Configuración del Modelo
- `modelName`: `"ColeccionUsuario"`
- `tableName`: `"Coleccion_usuario"`
- `timestamps: true` → Agrega `createdAt` y `updatedAt`

---

## 📄 Archivo: `index.ts`

### Descripción
Es el punto de entrada de la capa de datos. Se encarga de inicializar la conexión a PostgreSQL, instanciar los tres modelos y definir todas las asociaciones entre ellos. Exporta las instancias listas para usar en el resto de la aplicación.

### Inicialización de la Conexión
La conexión se resuelve mediante una lógica de prioridad:

1. Si existe `DATABASE_URL` (ej: NeonDB, Railway): se usa directamente con `new Sequelize(url, options)`.
2. Si no existe: se construye desde las variables individuales (`database`, `username`, `password`, `host`, `port`) definidas en `config/database.ts`.

En ambos casos se aplica la configuración de `logging` y `pool` del entorno activo (`development` o `production`).

### Instanciación de Modelos
```ts
const Usuario          = usuarioFactory(sequelize)
const Videojuego       = videojuegoFactory(sequelize)
const ColeccionUsuario = coleccionUsuarioFactory(sequelize)
```

### Asociaciones Definidas

| Asociación | Método Sequelize | `foreignKey` |
|---|---|---|
| `Usuario` ↔ `Videojuego` (N:M) | `belongsToMany` | `id_usuario` / `id_videojuego` |
| `ColeccionUsuario` → `Usuario` | `belongsTo` | `id_usuario` |
| `ColeccionUsuario` → `Videojuego` | `belongsTo` | `id_videojuego` |
| `Usuario` → `ColeccionUsuario` | `hasMany` | `id_usuario` |
| `Videojuego` → `ColeccionUsuario` | `hasMany` | `id_videojuego` |

### Exports
```ts
export { sequelize, Sequelize, Usuario, Videojuego, ColeccionUsuario }
```
# Integrante Santiago De dios
# Documentación de Migraciones, Modelos y Entorno Dockerizado

Esta documentación detalla la estructura de la base de datos relacional para el sistema de gestión de videojuegos, la estrategia conjunta de validaciones entre capas, y la configuración del entorno de desarrollo mediante Docker y pgAdmin.

---

## 1. Esquema de Base de Datos y Migraciones

El diseño de datos define una arquitectura donde los usuarios interactúan con un catálogo mediante una relación de **Muchos a Muchos (N:M)**, gestionada a través de una tabla intermedia que registra métricas personalizadas de consumo de videojuegos.

### 1.1. Tabla `Users`
Almacena las credenciales y el perfil esencial de los usuarios registrados en el sistema.
* **`id_usuario`**: Clave primaria de tipo entero con incremento automático.
* **`nombre`**: Cadena de texto obligatoria para la identificación del usuario.
* **`email`**: Cadena de texto obligatoria y única por cuenta para evitar duplicados.
* **`password`**: Cadena de texto obligatoria destinada a almacenar el hash de seguridad.

### 1.2. Tabla `Videojuegos`
Catálogo estructurado con los atributos de cada título disponible en la plataforma.
* **`id_videojuego`**: Identificador único entero autoincremental.
* **Campos informativos**: Registra de manera obligatoria el `titulo`, `genero`, `precio`, `descripcion`, `desarrollador` y `plataforma` de cada juego.

### 1.3. Tabla `Coleccion-usuario`
Tabla intermedia que rompe la relación N:M, vinculando usuarios con sus respectivos videojuegos y guardando información detallada de su progreso.
* **`id_usuario`**: Clave primaria y foránea conectada directamente a la tabla `Users`.
* **`id_videojuego`**: Clave primaria y foránea vinculada a la tabla `Videojuegos`.
* **`tiempo_jugado`**: Entero obligatorio que registra los minutos jugados, inicializado por defecto en 0.
* **`calificacion`**: Valor numérico flotante obligatorio pensado para albergar puntuaciones en escalas numéricas.
* **`estado`**: Cadena de texto obligatoria que por defecto se define como `'Sin_jugar'`.

---
## 2. Validaciones e Integridad a Nivel de Base de Datos

Toda la lógica de protección, consistencia y validación estructural de los datos se definió directamente en los archivos de migración, estableciendo las reglas físicas inmutables que el motor de base de datos se encarga de forzar:

* **Restricción de No Nulidad (`allowNull: false`)**: Se implementó de manera generalizada en todos los campos críticos de las tablas `Users`, `Videojuegos` y `Coleccion-usuario`, garantizando que nunca se guarden registros rotos o incompletos.
* **Validación de Unicidad Física**: Al declarar `unique: true` sobre la columna `email`, se previene de forma definitiva a nivel de almacenamiento la duplicación de usuarios con un mismo correo.
* **Integridad Referencial en Cascada**: Las llaves foráneas de la tabla intermedia incorporan las propiedades `onDelete: 'CASCADE'` y `onUpdate: 'CASCADE'`. Esto resguarda la consistencia de la base de datos ante eliminaciones o modificaciones concurrentes, borrando automáticamente los registros huérfanos asociados.

---
---

## 3. Entorno de Desarrollo Orquestado con Docker

La infraestructura de desarrollo está completamente automatizada mediante contenedores, permitiendo un despliegue homogéneo y simplificado del ecosistema de software.

### 3.1. Servicio Backend
* Se compila en base al entorno de desarrollo local empleando el archivo `Dockerfile.dev`.
* Expone el puerto de red **3001** para la API y el puerto **9229** destinado a las tareas de depuración en tiempo de ejecución.
* Mapea el código fuente local con volúmenes para reflejar cambios en tiempo real sin necesidad de reiniciar el contenedor.

### 3.2. Servicio pgAdmin
Herramienta de administración web integrada para monitorizar esquemas, optimizar consultas y auditar el comportamiento de la base de datos PostgreSQL.
* **Imagen base**: Utiliza el contenedor oficial `dpage/pgadmin4`.
* **Acceso Web**: Mapeado en el puerto local **5050** (`http://localhost:5050`).
* **Credenciales de Acceso Administrador**:
  * **Usuario (Email)**: `admin@admin.com`
  * **Contraseña (Password)**: `root`
