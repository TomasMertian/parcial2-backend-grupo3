import { Model, DataTypes, Sequelize } from 'sequelize';

export enum EstadoJuego {
  JUGANDO = 'jugando',
  EN_PROGRESO = 'en_progreso',
  COMPLETADO = 'completado'
}

export interface ColeccionUsuarioAttributes {
  id_usuario: number;
  videojuego_id: number;
  estado: EstadoJuego;
  calificacion: number;
  tiempo_jugado: number;
}

export interface ColeccionUsuarioCreationAttributes extends Partial<ColeccionUsuarioAttributes> {}

class ColeccionUsuario extends Model<ColeccionUsuarioAttributes, ColeccionUsuarioCreationAttributes> {
  declare id_usuario: number;
  declare videojuego_id: number;
  declare estado: EstadoJuego;
  declare calificacion: number;
  declare tiempo_jugado: number;
}

export default (sequelize: Sequelize) => {
  ColeccionUsuario.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'usuario', key: 'id_usuario' }
    },
    videojuego_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'videojuegos', key: 'id_videojuego' }
    },
    estado: {
      type: DataTypes.STRING(50),
      validate: {
        isIn: [[EstadoJuego.JUGANDO, EstadoJuego.EN_PROGRESO, EstadoJuego.COMPLETADO]]
      }
    },
    calificacion: {
      type: DataTypes.FLOAT,
      validate: {
        min: 1,
        max: 10,
        isFloat: true
      }
    },
    tiempo_jugado: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ColeccionUsuario',
    tableName: 'coleccion_usuario',
    timestamps: true
  });
  return ColeccionUsuario;
};
