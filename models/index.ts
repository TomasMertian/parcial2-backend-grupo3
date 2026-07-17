import { Sequelize } from 'sequelize';
import config from '../config/database';
import usuarioFactory from './Usuario';
import videojuegoFactory from './Videojuegos';
import coleccionUsuarioFactory from './ColeccionUsuario';

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];

let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  });
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: 'postgres',
      logging: dbConfig.logging,
      pool: dbConfig.pool,
      dialectOptions: dbConfig.dialectOptions
    }
  );
}

const Usuario = usuarioFactory(sequelize);
const Videojuego = videojuegoFactory(sequelize);
const ColeccionUsuario = coleccionUsuarioFactory(sequelize);

Usuario.belongsToMany(Videojuego, {
  through: ColeccionUsuario,
  foreignKey: 'id_usuario'
});
Videojuego.belongsToMany(Usuario, {
  through: ColeccionUsuario,
  foreignKey: 'id_videojuego'
});
ColeccionUsuario.belongsTo(Usuario, { foreignKey: 'id_usuario' });
ColeccionUsuario.belongsTo(Videojuego, { foreignKey: 'id_videojuego' });
Usuario.hasMany(ColeccionUsuario, { foreignKey: 'id_usuario' });
Videojuego.hasMany(ColeccionUsuario, { foreignKey: 'id_videojuego' });

export {
  sequelize,
  Sequelize,
  Usuario,
  Videojuego,
  ColeccionUsuario
};
