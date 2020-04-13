const db = require('../../config/db');
const Product = require('./product-model');
const checkType = require('../../utils').checkType;

module.exports = class PurchasedProduct {
    constructor({uuid=null, productNickName = null, serialNo=null, price=null, invoiceID=null, isValidate=null, productPhoto=null, claimQty=null, timestamp=null, invoicePhoto=null, warrantyPhoto=null, policyStartDate=null, policyEndDate=null} = {}) {
        // their attribute from the class
        this._uuid = uuid; 
        this._productNickName = productNickName;
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
        this._product = []; // from product class

        this._customer = null; //from customer class
      
        this._claimLog = []; //from claimLog class

        this._productCategory = []; //from productCategory class

        this._retailerBranch = null; //from retailer branch
 
        

    }
    


    //CRUD method
    _create() {
        console.log(this);
        return db.execute(
            'INSERT INTO purchased_product (product_nickname, serial_no, product_no, customer_id, price, invoice_id, timestamp, branch_id, retailer_id, receipt_photo, is_validate, product_photo, claim_qty, warranty_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.productNickName,
            this._serialNo,
            this._product.getProperty.productNo,
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

    static _readByuuid(uuid) {
        return db.execute(
            'SELECT * FROM purchased_product NATURAL JOIN product where uuid = ?',
            [uuid]
        );
    };

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
            'UPDATE purchased_product SET product_nickname = ?, serial_no = ? AND product_no = ?, customer_id = ?, price = ?, invoice_id = ?, timestamp = ?, branch_id =?, retailer_id = ?, receipt_photo = ?, is_validate = ?, product_photo = ?, claim_qty = ?, warranty_photo = ? WHERE   ',
            [this.productNickName,
            this._serialNo,
            this._product.getProperty.productNo,
            this._customer.getProperty.customerId,
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
            this._uuid
        ]
        );              
    };

    static _deleteByuuid(uuid) {
        return db.execute(
            'DELETE FROM purchased_product WHERE uuid = ?',
            [uuid]
        );
    }   

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
            serialNo: this._serialNo,
            price: this._price,
            invoiceId: this._invoiceId,
            isValidate: this._isValidate,
            productPhoto: this._productPhoto,
            claimQty: this._claimQty,
            timestamp: this.timestamp,
            invoicePhoto: this._invoicePhoto,
            warrantyPhoto: this._warrantyPhoto,
            policyStartDate: this._policyStartDate,
            policyEndDate: this._policyEndDate,

            product: this._product,
            customer: this._customer,   
            claimLog: this._claimLog,
            productCategory: this._productCategory,
            retailerBranch: this._retailerBranch
            
        };
    };


    set setProperty({
        // set its own property
        // destructuring object as parameter by using old values as a default.

        uuid = this._uuid,
        productNickName = this._productNickName,
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
        checkType(uuid, 'Number')
        checkType(productNickName, 'String');
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
        this._uuid = uuid;
        this._productNickName = productNickName;
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

    addProduct(product){
        checkType(product, 'Product');
        this._product.push(product);
        return;
    }

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

    addProductCategory(productCategory) {
        checkType(productCategory, 'ProductCategory');
        this._productCategory.push(productCategory);
        return;
    };
};
