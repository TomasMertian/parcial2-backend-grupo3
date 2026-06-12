import { Sequelize } from 'sequelize';
import config from '../config/database';
import usuarioFactory from './Usuario';
import videojuegoFactory from './Videojuego';
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
  foreignKey: 'videojuego_id'
});
ColeccionUsuario.belongsTo(Usuario, { foreignKey: 'id_usuario' });
ColeccionUsuario.belongsTo(Videojuego, { foreignKey: 'videojuego_id' });
Usuario.hasMany(ColeccionUsuario, { foreignKey: 'id_usuario' });
Videojuego.hasMany(ColeccionUsuario, { foreignKey: 'videojuego_id' });

export {
  sequelize,
  Sequelize,
  Usuario,
  Videojuego,
  ColeccionUsuario
};
