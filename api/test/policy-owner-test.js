const Customer = require('../models/customer/customer-model');
const db = require('../config/db');
const Product = require('../models/product/product-model');
const Retailer = require('../models/policy-owner/retailer/retailer-model');
const checkType = require('../utils').checkType;

const test = async () => {
    console.log( (await CustomerAccount._readByCustomerId(4))[0] );
    const customer = new Customer( (await Customer._readByCustomerId(4))[0][0] ).getProperty;

    console.log(customer);
}

const customer = new Customer({

})
 
test();