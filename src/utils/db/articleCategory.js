module.exports = (sequelize, DataTypes) => {
  const ArticleCategory = sequelize.define(
    "article_category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { timestamps: false }
  );

  ArticleCategory.associate = (models) => {
    ArticleCategory.belongsTo(models.Article);
    ArticleCategory.belongsTo(models.Category);
  };
  return ArticleCategory;
};
