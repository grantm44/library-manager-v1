'use strict';
module.exports = function(sequelize, DataTypes) {
  var Patron = sequelize.define('Patron', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter first name"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter last name"
        }
      }
    },
    address: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{
          msg: "Please enter valid email format (name@domain.com)"
        }
      }
    },
    library_id: DataTypes.STRING,
    zip_code: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Patron.hasMany(models.Loan, {foreignKey: 'patron_id'});
      }
    },
    instanceMethods: {
      fullName: function(){
        return this.first_name + ' ' + this.last_name;
      }
    }
  });
  return Patron;
};