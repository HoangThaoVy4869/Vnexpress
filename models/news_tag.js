'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class newsTag extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    newsTag.init({
        tagId: DataTypes.INTEGER,
        newsId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'newsTag',
    });
    return newsTag;
};