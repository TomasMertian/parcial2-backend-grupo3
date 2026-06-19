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
4- Si se encuentra: Retorna un estado 200 OK junto con el objeto completo del usuario.
3. Editar datos de un usuario
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
5- Imprime un [FLAG] en la consola del servidor y responde con un estado 200 OK enviando el usuario actualizado sin la contraseña.
4. Eliminar Cuenta
Borra de forma física y definitiva el registro de un usuario en la base de datos tras verificar su existencia.

Ruta: /usuarios/:id
Método HTTP: DELETE
**Parámetros de URL (params): id
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