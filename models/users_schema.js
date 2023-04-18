'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_schema extends Model {
    
    static associate(models) {
      
    }
  }
  Users_schema.init({
    role: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_Verified: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users_schema',
  });
  return Users_schema;
};