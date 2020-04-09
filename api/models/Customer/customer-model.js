const db = require('../../config/db');
const checkType = require('../../utils').checkType;

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
        this._customerAddress = []; // relationship to CustomerAddress
        this._customerAccount = null; // relationship to CustomerAccount
        this._purchasedProduct = []; // relationship to PurchasedProduct
    }
    // DM layer CRUD
    _create () {
        return db.execute();
    }

    static _read () {

    }

    _update () {

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
            birthNo: this._birthNo,
            gender: this._gender,
            customerAddress: this._customerAddress,
            customerAccount: this._customerAccount,
            purchaseProduct: this._purchasedProduct
        };
    }

    set setProperty({
        customerId = this._customerId,
        firstname = this._firstname,
        lastname = this._lastname,
        phoneNo = this._phoneNo,
        birthNo = this._birthNo,
        gender = this._gender,
        customerAccount = this._customerAccount
    }) {
        checkType(customerId, 'String');
        checkType(firstname, 'String');
        checkType(lastname, 'String');
        checkType(phoneNo, 'String');
        checkType(birthNo, 'String');
        checkType(gender, 'String');
        checkType(customerAccount, 'CustomerAccount');
        this._customerId = customerId,
        this._firstname = firstname,
        this._lastname = lastname,
        this._phoneNo = phoneNo,
        this._birthNo = birthNo,
        this._gender = gender,
        this._customerAccount = customerAccount
    }

    // Problem Domain method
    addPurchasedProduct (purchasedProduct) {
        checkType(purchasedProduct, 'PurchasedProduct');
        this._purchasedProduct.push(purchasedProduct);
        purchasedProduct._create();
    }

    deletePurchasedProduct (purchasedProduct) {       
        checkType(purchasedProduct, 'PurchasedProduct');
        const index = this._purchasedProduct.indexOf(purchasedProduct);
        if (index > -1) {
            this._purchasedProduct.splice(index, 1);
            purchasedProduct._delete();
        }
    }
}
