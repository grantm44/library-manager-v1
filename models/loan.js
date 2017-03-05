'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: { 
        isDate: {
          msg: 'Must enter date of loan'
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: 'Must enter due date'
        }
      }
    },
    returned_on: DataTypes.DATEONLY
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Loan.belongsTo(models.Book, {foreignKey: 'book_id'});
        Loan.belongsTo(models.Patron, {foreignKey: 'patron_id'});
      }
    }
  });
  return Loan;
};