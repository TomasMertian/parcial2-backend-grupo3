import { Model, DataTypes, Sequelize } from 'sequelize';

export interface ColeccionUsuarioAttributes {
  usuario_id: number;
  videojuego_id: number;
  estado: string;
  calificacion: number;
  tiempo_juego: number;
}

export interface ColeccionUsuarioCreationAttributes extends Partial<ColeccionUsuarioAttributes> {}

class ColeccionUsuario extends Model<ColeccionUsuarioAttributes, ColeccionUsuarioCreationAttributes> {
  declare usuario_id: number;
  declare videojuego_id: number;
  declare estado: string;
  declare calificacion: number;
  declare tiempo_juego: number;
}

export default (sequelize: Sequelize) => {
  ColeccionUsuario.init({
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'usuario', key: 'id_usuario' }
    },
    videojuego_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'videojuegos', key: 'id_videojuego' }
    },
    estado: DataTypes.STRING(50),
    calificacion: DataTypes.INTEGER,
    tiempo_juego: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ColeccionUsuario',
    tableName: 'coleccion_usuario',
    timestamps: true
  });
  return ColeccionUsuario;
};
