'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class News extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    News.init({
        title: DataTypes.STRING,
        metaTitle: DataTypes.STRING,
        slug: DataTypes.STRING,
        summary: DataTypes.STRING,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
        author: DataTypes.STRING,
        categoryId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'News',
    });
    return News;
};