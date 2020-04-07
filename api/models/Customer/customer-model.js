const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Customer {
    constructor(customerId, firstname, lastname, phoneNo, birthNo, gender) {
        // their own class atrribute ref. from class diagram
        this._customerId = customerId;
        this._firstname = firstname;
        this._lastname = lastname;
        this._phoneNo = phoneNo;
        this._birthNo = birthNo;
        this._gender = gender;
        // their relationships to its neighbor ref. from class diagram
        this._customerAddress = []; // composite
        this._customerAccount;
        this._purchasedProduct = []; // relationship to purchasedproduct
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

    // Problem Domain method
    addPurchasedProduct (purchasedProduct) {
        this._purchasedProduct.push(purchasedProduct);
        purchasedProduct._create();
    }

    
    addCustomerAddress (customerAddress){
        this._customerAddress.push(customerAddress);
        customerAddress._create();
    }

    deleteCustomerAddress(){
        if(!customerAddress instanceof customerAddress){
            throw TypeError;
        }else{
            const index = this._customerAddress.indexOf(customerAddress);
            if (index > -1) {
                this._customerAddress.splice(index, 1);
            }
            customerAddress._delete();
        }
    }

    deletePurchasedProduct (purchasedProduct) {
        if (!purchasedProduct instanceof PurchasedProduct) {
            throw TypeError;
        } else {
            const index = this._purchasedProduct.indexOf(purchasedProduct);
            if (index > -1) {
                this._purchasedProduct.splice(index, 1);
            }
            purchasedProduct._delete();
        }
    }

    getCustomerId(){
        return this._customerId;
    }
}