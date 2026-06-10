import { Model, DataTypes, Sequelize } from 'sequelize';

export interface UsuarioAttributes {
  id_usuario: number;
  nombre: string;
  email: string;
  contraseña: string;
}

export interface UsuarioCreationAttributes extends Partial<UsuarioAttributes> {}

class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> {
  declare id_usuario: number;
  declare nombre: string;
  declare email: string;
  declare contraseña: string;
}

export default (sequelize: Sequelize) => {
  Usuario.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    contraseña: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
    timestamps: true
  });
  return Usuario;
};
