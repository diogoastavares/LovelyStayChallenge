import { Model, DataTypes, Sequelize } from 'sequelize';
import Users from './Users';

export default class LanguagesAttributes extends Model {
  public id!: number;
  public user_id!: number;
  public language!: string;
}

export const Languages = (sequelize: Sequelize) => {
  LanguagesAttributes.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Languages',
    }
  );

  // Define associations
  LanguagesAttributes.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Users.hasMany(LanguagesAttributes, {
    foreignKey: 'user_id',
    as: 'languages',
  });

};
