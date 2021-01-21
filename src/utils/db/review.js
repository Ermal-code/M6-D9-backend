module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("review", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isClapped: DataTypes.BOOLEAN,
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Author);
    Review.belongsTo(models.Article);
  };
  return Review;
};
