import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

export interface UsuarioAttributes {
  id_usuario: number;
  nombre: string;
  email: string;
  password: string;
}

export interface UsuarioCreationAttributes extends Partial<UsuarioAttributes> {}

class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> {
  declare id_usuario: number;
  declare nombre: string;
  declare email: string;
  declare password: string;
  async validarPassword (password:string): Promise<boolean>{
    return await bcrypt.compare(password, this.password);
  }
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
    unique: true,
    validate: {
      isEmail: true
    }
  },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: Usuario) => {
        user.password = await bcrypt.hash(user.password,10);
      }
    } 
  });
  return Usuario;
};
