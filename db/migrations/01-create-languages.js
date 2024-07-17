const DataTypes = require('sequelize').DataTypes;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Languages', {
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
    });

    await queryInterface.addConstraint('Languages', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_id_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Languages', {
      fields: ['user_id', 'language'],
      type: 'unique',
      name: 'unique_user_language'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Languages');
  }
};
