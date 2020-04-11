const Customer = require('../models/customer/customer-model');
// const db = require('../config/db');
const Product = require('../models/product/product-model');

const customer = new Customer({
    customerId: '1',
})

const f = async () => {
    console.log(await Customer._readByCustomerId('1'));
} 

f();