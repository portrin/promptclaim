const PolicyOwner = require('../models/policy-owner/policy-owner-model');
const Supplier = require('../models/policy-owner/supplier/supplier-model');
const RootAccount = require('../models/policy-owner/policy-owner-account/root-account');

const ownerOne = new PolicyOwner('123', 'S');
const supplierOne = new Supplier('123', 'S', '456', 'Boonthavorn', 'hehehe', '023847564', '55/234 Phaholyothin Rd.');
const rootAccount = new RootAccount('123', 'abc', 'dsaf', 'S');

console.log(ownerOne);
console.log(supplierOne._rootAccount);
console.log(rootAccount);
console.log(RootAccount);
