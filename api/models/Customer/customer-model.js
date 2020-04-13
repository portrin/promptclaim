const db = require('../../config/db');
const checkType = require('../../utils').checkType;
const PurchasedProduct = require('../product/purchased-product-model');
const ClaimLog = require('../product/claim-log-model');
const Notification = require('./notification-model');
const CustomerAddress = require('./customer-address-model')

module.exports = class Customer {
    constructor({customerId=null, firstname=null, lastname=null, phoneNo=null, birthDate=null, gender=null} = {}) {
        // their own class atrribute ref. from class diagram
        this._customerId = customerId
        this._firstname = firstname
        this._lastname = lastname
        this._phoneNo = phoneNo
        this._birthDate = birthDate
        this._gender = gender
        // their relationships to its neighbor ref. from class diagram
        this._customerAccount = null;   // relationship to CustomerAccount
        this._customerAddress = [];     // relationship to CustomerAddress
        this._purchasedProduct = [];    // relationship to PurchasedProduct
        this._notification = [];        // relationship to Notification
        // special attributes that will be used often.
        this._claimLog = [];           
    }
    // DM layer CRUD
    _create () {
        return db.execute(
            'INSERT INTO customer (customer_id, firstname, lastname, phone_no, birth_date, gender, account_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this._customerId, this._firstname, this._lastname, this._phoneNo, this._birthDate, this._gender, this._customerAccount.getProperty.accountId]
        );
    }

    static _readByCustomerId (customerId) {
        return db.execute(
            'SELECT * FROM customer WHERE customer_id = ?', 
            [customerId]
        )
    }

    _read () {
        db.execute(
            'SELECT * FROM customer WHERE customer_id = ?',
            [this._customerId]
        )
    }

    _update () {
        db.execute(
            'UPDATE customer SET firstname = ?, lastname = ?, phone_no = ?, birth_date = ?, gender = ?, account_id = ? WHERE customer_id = ?',
            [this._firstname, this._lastname, this._phoneNo, this._birthDate, this._gender, this._customerAccount.getProperty.accountId, this._customerId]
        )
    }

    _delete () {
        return db.execute('DELETE FROM customer WHERE custumer_id = ?', [this._customerId])
    }

    // getter and setter
    get getProperty() {
        return {
            customerId: this._customerId,
            firstname: this._firstname,
            lastname: this._lastname,
            phoneNo: this._phoneNo,
            birthDate: this._birthDate,
            gender: this._gender,
            customerAddress: this._customerAddress,
            customerAccount: this._customerAccount,
            purchasedProduct: this._purchasedProduct,
            claimLog: this._claimLog,
            notification: this._notification
        };
    }

    set setProperty({  // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        customerId = this._customerId,
        firstname = this._firstname,
        lastname = this._lastname,
        phoneNo = this._phoneNo,
        birthDate = this._birthDate,
        gender = this._gender,
    }) {
        // check datatype
        checkType(customerId, 'String');
        checkType(firstname, 'String');
        checkType(lastname, 'String');
        checkType(phoneNo, 'String');
        checkType(birthDate, 'String');
        checkType(gender, 'String');
        // assign to private variables
        this._customerId = customerId;
        this._firstname = firstname;
        this._lastname = lastname;
        this._phoneNo = phoneNo;
        this._birthDate = birthDate;
        this._gender = gender;
    }

    // Problem Domain method
    //Purchased Product
    addPurchasedProduct(purchasedProduct) {
        checkType(purchasedProduct, 'PurchasedProduct');
        this._purchasedProduct.push(purchasedProduct);
        purchasedProduct._create();
        return;
    }

    deletePurchasedProduct(purchasedProduct) {       
        checkType(purchasedProduct, 'PurchasedProduct');
        const index = this._purchasedProduct.indexOf(purchasedProduct);
        if (index > -1) {
            this._purchasedProduct.splice(index, 1);
            purchasedProduct._delete();
        }
        return;
    }

    editPurchasedProduct(purchasedProduct, obj = {}) {
        checkType(purchasedProduct, 'PurchasedProduct');
        const index = this._purchasedProduct.indexOf(purchasedProduct);
        if(index > -1) {
            this._purchasedProduct[index] = purchasedProduct.setProperty(obj);
            purchasedProduct._update();
        }
        return;
    }

    getPurchasedProduct() {
        this._purchasedProduct = PurchasedProduct._readByCustomerId(this._customerId) // static method name may be change.
        return this._purchasedProduct;
    }

    // Claim Log
    addClaimLog(purchasedProduct, claimLog) {
        checkType(purchasedProduct, 'PurchasedProduct');
        checkType(claimLog, 'ClaimLog');
        const index = this._purchasedProduct.indexOf(purchasedProduct);
        if(index > -1) {
            this._purchasedProduct[index].addClaimLog(claimLog);
        }
        return;
    }

    // REFACTOR NEEDED !!
    editClaimLog(purchasedProduct, obj = {}) {
        checkType(purchasedProduct, 'PurchasedProduct');
        const index = this._purchasedProduct.indexOf(purchasedProduct);
        if(index > -1) {
            this._purchasedProduct[index].editClaimLog(obj);
        }
        return;
    }

    // REFACTOR NEEDED !!
    deleteClaimLog(purchasedProduct, claimLog) {
        checkType(purchasedProduct, 'PurchasedProduct');
        checkType(claimLog, 'ClaimLog');
        const index = this._purchasedProduct.indexOf(purchasedProduct);
        if(index > -1) {
            this._purchasedProduct[index].deleteClaimLog(claimLog);
        }
        return;
    }

    getClaimLog() {
        this._claimLog = ClaimLog._readByCustomerId(this._customerId); // ClaimLog static method
        return this._claimLog;
    }

    editProfile(obj={}) {
        this.setProperty(obj);
        this._update();
        return;
    }

    // Customer Address
    addCustomerAddress(customerAddress){
        checkType(customerAddress, 'CustomerAddress')
        this._customerAddress.push(customerAddress);
        customerAddress._create();
        return;
    }

    editCustomerAddress(customerAddress, obj ={}){
        checkType(customerAddress, 'CustomerAddress');
        const index = this._customerAddress.indexOf(customerAddress);
        if(index > -1){
            this._customerAddress[index] = customerAddress.setProperty(obj);
            customerAddress._update();
        }
        return;
    }
   
    deleteCustomerAddress(customerAddress){
        checkType(customerAddress, 'customerAddress');
        const index = this._customerAddress.indexOf(customerAddress);
        if(index > -1){
            this._customerAddress.splice(index,1);
            customerAddress._delete();
        }
        return;
    }

    getCustomerAddress(){
        this._customerAddress = CustomerAddress._readByCustomerId(this._customerId)
        return this._customerAddress;
    }

    // Notification
    getNotification() {
        this._notification = Notification._readByCustomerId(this._customerId); // Notification static method
        return this._notification;
    }

    // Customer Account
    addCustomerAccount(customerAccount) {
        checkType(customerAccount, 'CustomerAccount');
        this._customerAccount = customerAccount;
        return;
    }
}
