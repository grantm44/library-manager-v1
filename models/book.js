'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    //id: {type: DataTypes.INTEGER, primaryKey: true},
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter a title"
        }
      }
    }, 
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter author"
        }
      }
    },
    genre: DataTypes.STRING,
    first_published: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Book.hasMany(models.Loan, {foreignKey: 'book_id'});
      }
    },
    instanceMethods: {
      /*getTitle: function(){
        return this.title;
      }*/
    }
  });
  return Book;
};