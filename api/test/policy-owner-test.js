const Customer = require('../models/customer/customer-model');
const db = require('../config/db');
const Product = require('../models/product/product-model')

const customer = new Customer({customerId:'123', firstname:'Trin', lastname:'seng', phoneNo:'123432', birthDate:'1999-05-04', gender:'M'});

//console.log(db)

console.log(Product._read())