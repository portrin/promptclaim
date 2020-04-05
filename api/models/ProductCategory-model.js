const db = require('../config/db');

module.exports = class ProductCategory {
    constructor () {
        this._categoryId = categoryId;
        this._categotyName = categoryName;
    };
	static getCategoryId() {
		return this.categoryId;
	};

	static getCategoryName() {
		return this.categoryName;
    }; 
    
};