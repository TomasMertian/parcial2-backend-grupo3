const { createClient } = require('redis');

// cree el conector apuntando al contenedor de docker
const redisClient = createClient({
    url: 'redis://redis:6379' 
});

// avisa por consola si hay error o si se conecto correctamente
redisClient.on('error', (err) => console.log('error en redis:', err));
redisClient.on('connect', () => console.log('conectado correctamente'));

redisClient.connect();

// lo exporte para poder usarlo en los controladores
module.exports = redisClient;