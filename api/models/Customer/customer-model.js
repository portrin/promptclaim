const db = require('../../config/db');
const checkType = require('../../utils').checkType;


module.exports = class Customer {
    constructor(customer_id, firstname, lastname, phone_no, birth_no, gender) {
        // their own class atrribute ref. from class diagram
        this._customer_id = customer_id;
        this._firstname = firstname;
        this._lastname = lastname;
        this._phone_no = phone_no;
        this._birth_no = birth_no;
        this._gender = gender;
        // their relationships to its neighbor ref. from class diagram
        this._customerAddress = []; // composite
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
        return db.execute('DELETE FROM customer WHERE custumer_id = ?', [this._customer_id])
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
