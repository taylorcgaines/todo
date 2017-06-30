'use strict';
module.exports = function(sequelize, DataTypes) {
  var toDos = sequelize.define('toDos', {
    task: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return toDos;
};
