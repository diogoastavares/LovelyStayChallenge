const DataTypes = require('sequelize').DataTypes;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Users', {
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
    });

    await queryInterface.addConstraint('Users', {
      fields: ['github_username'],
      type: 'unique',
      name: 'unique_github_username'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};
