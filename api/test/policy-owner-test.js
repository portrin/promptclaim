const Customer = require('../models/customer/customer-model');

const customer = new Customer('123', 'Trin', 'seng', '123432', '1999', 'M');
const ret = customer.getProperty;

console.log(ret);
customer.setProperty = {
    firstname: 'Trin',
    lastname: '123',
    gender: 'F'
}
console.log(customer.getProperty)
const res = customer.getClaimLog()
// new PurchasedProduct('','','','','','','','','','','','','','','')