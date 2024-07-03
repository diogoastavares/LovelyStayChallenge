import { Model, DataTypes, Sequelize } from 'sequelize';

export default class UsersAttributes extends Model{
  public id!: number;
  public github_username!: string;
  public name!: string;
  public location!: string;
}

export const Users = (sequelize: Sequelize) => {
  UsersAttributes.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    github_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false
  });
  UsersAttributes.sync();
}
