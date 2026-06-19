import { Model, DataTypes, Sequelize } from 'sequelize';

export interface VideojuegoAttributes {
  id_videojuego: number;
  titulo: string;
  genero: string;
  plataforma: string;
  desarrollador: string;
  descripcion: string;
  precio: number;
}

export interface VideojuegoCreationAttributes extends Partial<VideojuegoAttributes> {}

class Videojuego extends Model<VideojuegoAttributes, VideojuegoCreationAttributes> {
    declare id_videojuego: number;
    declare titulo: string;
    declare genero: string;
    declare plataforma: string;
    declare desarrollador: string;
    declare descripcion: string;
    declare precio: number;
}

export default (sequelize: Sequelize) => {
    Videojuego.init({
    id_videojuego: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    titulo: {
    type: DataTypes.STRING(200),
    allowNull: false
    },
    genero: DataTypes.STRING(100),
    plataforma: DataTypes.STRING(100),
    desarrollador: DataTypes.STRING(200),
    descripcion: DataTypes.TEXT,
    precio: DataTypes.DECIMAL(10, 2)
    }, {
    sequelize,
    modelName: 'Videojuego',
    tableName: 'Videojuegos',
    timestamps: true
    });
    return Videojuego;
    };