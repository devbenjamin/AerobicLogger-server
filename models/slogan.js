module.exports = function (sequelize, DataTypes) {
  return sequelize.define('slogan', {
    
      title: DataTypes.STRING,
    
    
    // userID:{
    //   type: DataTypes.STRING
    // }
  });
};
