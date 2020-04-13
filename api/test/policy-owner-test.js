const Customer = require('../models/customer/customer-model');
const db = require('../config/db');
const Product = require('../models/product/product-model');
const Retailer = require('../models/policy-owner/retailer/retailer-model');
const checkType = require('../utils').checkType;

const customer = new Customer({
    customerId: '1',
})
// const date = new Date().toISOString().slice(0, 19).replace('T', ' '); 
// const a = async () => { const res = await db.execute(
//     'INSERT INTO notification (noti_id, message, timestamp, customer_id) VALUES (?, ?, ?, ?)',
//     ['5', 'hello', date, '1']
// );
// console.log(res);
// }

const retailer = new Retailer({
    policyOwnerId: '09123',
    retailerId: '000833',
    contact: 'dasfaf',
    name: 'kuy',
    hqAddress: 'CX'
});

console.log(Object.getPrototypeOf(retailer).name)
console.log(retailer.constructor.name)
checkType(retailer, 'PolicyOwr');
