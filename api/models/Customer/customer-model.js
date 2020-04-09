const db = require('../../config/db');
const checkType = require('../../utils').checkType;
const PurchasedProduct = require('../product/purchased-product-model');
const ClaimLog = require('../product/claim-log-model');
const Notification = require('./notification-model');


module.exports = class Customer {
    constructor(customerId, firstname, lastname, phoneNo, birthNo, gender) {
        // their own class atrribute ref. from class diagram
        this._customerId = customerId || null;
        this._firstname = firstname || null;
        this._lastname = lastname || null;
        this._phoneNo = phoneNo || null;
        this._birthNo = birthNo || null;
        this._gender = gender || null;
        // their relationships to its neighbor ref. from class diagram
        this._customerAccount = null;   // relationship to CustomerAccount
        this._customerAddress = [];     // relationship to CustomerAddress
        this._purchasedProduct = [];    // relationship to PurchasedProduct
        this._notification = [];        // relationship to Notification
        // special attributes that will be used often.
        this._claimLog = [];           
    }
    // DM layer CRUD
    async _create () {
        return await db.execute();
    }

    static async _read () {

    }

    async _read () {

    }

    async _update () {

    }

    async _delete () {
        return await db.execute('DELETE FROM customer WHERE custumer_id = ?', [this._customerId])
    }

    // getter and setter
    get getProperty() {
        return {
            customerId: this._customerId,
            firstname: this._firstname,
            lastname: this._lastname,
            phoneNo: this._phoneNo,
            birthNo: this._birthNo,
            gender: this._gender,
            customerAddress: this._customerAddress,
            customerAccount: this._customerAccount,
            purchasedProduct: this._purchasedProduct
        };
    }

    set setProperty({  // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        customerId = this._customerId,
        firstname = this._firstname,
        lastname = this._lastname,
        phoneNo = this._phoneNo,
        birthNo = this._birthNo,
        gender = this._gender,
    }) {
        // check datatype
        checkType(customerId, 'String');
        checkType(firstname, 'String');
        checkType(lastname, 'String');
        checkType(phoneNo, 'String');
        checkType(birthNo, 'String');
        checkType(gender, 'String');
        // assign to private variables
        this._customerId = customerId,
        this._firstname = firstname,
        this._lastname = lastname,
        this._phoneNo = phoneNo,
        this._birthNo = birthNo,
        this._gender = gender
    }

    // Problem Domain method
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

    addClaimLog(purchasedProduct, claimLog) {
        checkType(purchasedProduct, 'PurchasedProduct');
        checkType(claimLog, 'ClaimLog');
        const index = this._purchasedProduct.indexOf(purchasedProduct);
        if(index > -1) {
            this._purchasedProduct[index].addClaimLog(claimLog);
        }
        return;
    }

    editClaimLog(purchasedProduct, obj = {}) {
        checkType(purchasedProduct, 'PurchasedProduct');
        const index = this._purchasedProduct.indexOf(purchasedProduct);
        if(index > -1) {
            this._purchasedProduct[index].editClaimLog(obj);
        }
        return;
    }

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
        return;
    }

    getNotification() {
        this._notification = Notification._readByCustomerId(this._customerId); // Notification static method
        return this._notification;
    }
}
