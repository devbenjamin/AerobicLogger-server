module.exports = function (sequelize, DataTypes) {
  return sequelize.define('session', {
      date: DataTypes.DATE,
      // startTime: DataTypes.DATE,
      // endTime: DataTypes.DATE,
      // totalTime: DataTypes.DATE,
      // level: DataTypes.INTEGER,
      // elevation: DataTypes.INTEGER,
      // mhr: DataTypes.INTEGER,
      // weight: DataTypes.INTEGER,
      // user_id: DataTypes.INTEGER,
      // slogan_id: DataTypes.INTEGER
  });
};
