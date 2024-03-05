'use strict';
const {
  Model
} = require('sequelize');
const { DeletedAt } = require('@sequelize/core/decorators-legacy');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
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
  File.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    filename: DataTypes.STRING,
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    path: DataTypes.STRING,
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
    modelName: 'File',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt'
  });
  return File;
};