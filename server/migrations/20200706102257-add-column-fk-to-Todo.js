'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * return queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Todos', 'UserId',{ 
      type: Sequelize.INTEGER ,
      references : {
        model : "Users",
        key : "id"
      },
      onUpdate : "cascade",
      onDelete : "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * return queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('Todos','UserId',);
  }
};
