import { Model, DataTypes, Sequelize } from 'sequelize';

export enum EstadoJuego {
  JUGANDO = 'jugando',
  EN_PROGRESO = 'en_progreso',
  COMPLETADO = 'completado'
}

export interface ColeccionUsuarioAttributes {
  id_usuario: number;
  id_videojuego: number;
  estado: EstadoJuego;
  calificacion: number;
  tiempo_jugado: number;
}

export interface ColeccionUsuarioCreationAttributes extends Partial<ColeccionUsuarioAttributes> {}

class ColeccionUsuario extends Model<ColeccionUsuarioAttributes, ColeccionUsuarioCreationAttributes> {
  declare id_usuario: number;
  declare id_videojuego: number;
  declare estado: EstadoJuego;
  declare calificacion: number;
  declare tiempo_jugado: number;
}

export default (sequelize: Sequelize) => {
  ColeccionUsuario.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'Users', key: 'id_usuario' }
    },
    id_videojuego: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'Videojuegos', key: 'id_videojuego' }
    },
    estado: {
      type: DataTypes.STRING(50),
      defaultValue: 'Sin_jugar'
    },
    calificacion: {
      type: DataTypes.FLOAT,
      validate: {
        min: 1,
        max: 10,
        isFloat: true
      }
    },
    tiempo_jugado: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'ColeccionUsuario',
    tableName: 'Coleccion-usuario',
    timestamps: true
  });
  return ColeccionUsuario;
};
