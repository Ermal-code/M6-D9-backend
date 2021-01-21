module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    headLine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subHead: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Article.associate = (models) => {
    Article.hasMany(models.ArticleCategory);
    Article.belongsTo(models.Author);
    Article.hasMany(models.Review);
    Article.belongsToMany(models.Category, {
      through: { model: models.ArticleCategory, unique: false },
    });
  };
  return Article;
};
