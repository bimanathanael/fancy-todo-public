'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * return queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint('ProjectUsers', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'FK_UserId',
      references: { 
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .then ( () =>{
      return queryInterface.addConstraint('ProjectUsers', {
        fields: ['ProjectId'],
        type: 'foreign key',
        name: 'FK_ProjectId',
        references: { 
          table: 'Projects',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * return queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint('ProjectUsers', 'FK_UserId')
    .then( () => {
      return queryInterface.removeConstraint('ProjectUsers', 'FK_ProjectId')
    })
  }
};
