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
    }
  }
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
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
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};