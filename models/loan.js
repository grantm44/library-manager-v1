'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATEONLY,
    return_by: DataTypes.DATEONLY,
    returned_on: DataTypes.DATEONLY
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Loan.belongsTo(models.Book, {foreignKey: 'book_id'});
        Loan.belongsTo(models.Patron, {foreignKey: 'patron_id'});
      }
    },
    instanceMethods: {
      returnBook : function(date){
        //console.log(value);
        //var date = document.getElementById('returned_on').value;
       
        console.log(date);
      }
    }
  });
  return Loan;
};