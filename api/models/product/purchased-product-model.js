const db = require('../../config/db');
const Product = require('./product-model');
const checkType = require('../../utils');

module.exports = class PurchasedProduct extends Product {
    constructor({productNo=null, productName=null, productModel=null, productDescription=null, serialNo=null, price=null, invoiceID=null, isValidate=null, productPhoto=null, claimQty=null, timestamp=null, invoicePhoto=null, warrantyPhoto=null, policyStartDate=null, policyEndDate=null} = {}) {
        super(productNo, productName, productModel, productDescription); 
        // their attribute from the class
        this._serialNo = serialNo;
        this._price = price;
        this._invoiceId = invoiceID;
        this._isValidate = isValidate;
        this._productPhoto = productPhoto;
        this._claimQty = claimQty;
        this._timestamp = timestamp;
        this._invoicePhoto = invoicePhoto;
        this._warrantyPhoto = warrantyPhoto;
        this._policyStartDate = policyStartDate;
        this._policyEndDate = policyEndDate; 

        // relationship
        this._customer = null; //from customer class
      
        this._claimLog = [];

        this._retailerBranch = null; //from retailer branch
 
        

    }
    


    //CRUD method
    _create() {
        console.log(this);
        return db.execute(
            'INSERT INTO purchased_product (serial_no, product_no, customer_id, price, invoice_id, timestamp, branch_id, retailer_id, receipt_photo, is_validate, product_photo, claim_qty, warranty_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this._serialNo,
            this._productNo,
            this._customer.getProperty.customerId,
            this._price,
            this._invoiceId,
            this._timestamp,
            this._retailerBranch.getProperty.branchId,
            this._retailerBranch.getProperty.retailerId,
            this._invoicePhoto,
            this._isValidate,
            this._productPhoto,
            this._claimQty,
            this._warrantyPhoto
        ]
        );
    }

    static _readByKey(serialNo, productNo) {
        return db.execute(
            'SELECT * FROM purchased_product NATURAL JOIN product WHERE serial_no = ? AND product_no = ? ',
            [serialNo, productNo]
            );
    };

    static _read() {
        return db.execute(
            'SELECT * FROM purchased_product NATURAL JOIN product',
        );
    };


    _update() {
        return db.execute(
            'UPDATE purchased_product SET customer_id = ?, price = ?, invoice_id = ?, timestamp = ?, branch_id =?, retailer_id = ?, receipt_photo = ?, is_validate = ?, product_photo = ?, claim_qty = ?, warranty_photo = ? WHERE serial_no = ? AND product_no = ?  ',
            [this._customer.getProperty.customerId,
            this._price,
            this._invoiceID,
            this._timestamp,
            this._retailerBranch.getProperty.branchId,
            this._retailerBranch.getProperty.retailerId,
            this._receiptPhoto,
            this._isValidate,
            this._productPhoto,
            this._claimQty,
            this._warrantyPhoto,
            this._serialNo,
            this._productNo,   
        ]
        );              
    };

    static _deleteByKey(serialNo, productNo) {
        return db.execute(
            'DELETE FROM purchased_product WHERE purchased_product.serial_no = ? AND purchased_product.product_no = ?',
            [serialNo, productNo]
        );
    }   


    _delete() {
        return db.execute(
            'DELETE FROM purchased_product WHERE purchased_product.serial_no = ? AND purchased_product.product_no = ? ',
            [this._serialNo, this._productNo]
        )
    }

//--------------------------------------------------------------------------------------------------------------------------------------------

    //Problem Domain Getter&Setter
    get getProperty () {
        return {
            productNo: this.productNo,
            productName: this.productName,
            productModel: this.productModel,
            productDescription: this.productDescription,

            serialNo: this._serialNo,
            price: this._price,
            invoiceId: this._invoiceId,
            isValidate: this._isValidate,
            productPhoto: this._productPhoto,
            claimQty: this._claimQty,
            timestamp: this.timestamp,
            invoicePhoto: this._invoicePhoto,
            warrantyPhoto: this._warrantyPhoto,

            customerId: this._customerId,
            policyStartDate: this._policyStartDate,
            policyEndDate: this._policyEndDate,
            retailerId: this._retailerId,
            branchId: this._branchId
        };
    };


    set setProperty({
        // set its own property
        // destructuring object as parameter by using old values as a default.
        productNo = this.productNo,
        productName = this.productName,
        productModel = this.productModel,
        productDescription = this.productDescription,

        serialNo = this._serialNo,
        price = this._price,
        invoiceId = this._invoiceId,
        isValidate = this._isValidate,
        productPhoto = this._productPhoto,
        claimQty = this._claimQty,
        timestamp = this._timestamp,
        invoicePhoto = this._invoicePhoto,
        warrantyPhoto = this._warrantyPhoto
    }) {
        //check datatype
        checkType(productNo, 'String');
        checkType(productName, 'String');
        checkType(productModel, 'String');
        checkType(productDescription, 'String');

        checkType(serialNo, 'String');
        checkType(price, 'Number');
        checkType(invoiceId, 'String');
        checkType(isValidate, 'Boolean');
        checkType(productPhoto, 'String');
        checkType(claimQty, 'Number');
        checkType(timestamp, 'String');
        checkType(invoicePhoto, 'String');
        checkType(warrantyPhoto, 'String');

        //assign to private vaiable
        this.productNo = productNo;
        this.productName = productName;
        this.productModel = productModel;
        this.productDescription = productDescription;

        this._serialNo = serialNo;
        this._price = price;
        this._invoiceId = invoiceId;
        this._isValidate = isValidate;
        this._productPhoto = productPhoto;
        this._claimQty = claimQty;
        this._timestamp = timestamp;
        this._invoicePhoto = invoicePhoto;
        this._warrantyPhoto = warrantyPhoto;

    };

    addCustomer(customer) {
        checkType(customer, 'Customer');
        this._customer = customer;
        return;     
    };

    addRetailerBranch(retailerBranch) {
        checkType(retailerBranch, 'RetailerBranch');
        this._retailerBranch = retailerBranch;
        return;
    }

    addClaimLog(claimLog) {
        checkType(claimLog, 'ClaimLog');
        this._claimLog.push(claimLog);
        return;
    };
};
