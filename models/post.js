'use strict';
const {
  Model
} = require('sequelize');
const { DeletedAt } = require('@sequelize/core/decorators-legacy');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    DeletedAt;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.File, { foreignKey: 'thumbnail' });
      models.Post.belongsToMany(models.Category, {
        through: 'PostCategory',
        foreignKey: 'postId',
        as: 'categories'
      });
    }
  }
  Post.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
      foreignKey: true,
      references: {
        model: 'File',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Draft', 'Published']
    },
    slug: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt'
  });
  return Post;
};