'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Todos', 'ProjectId',{ 
      type: Sequelize.INTEGER ,
      references : {
        model : "Projects",
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
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('Todos','ProjectId',);
  }
};
