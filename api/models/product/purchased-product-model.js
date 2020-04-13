const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class PurchasedProduct {
    constructor({uuid=null, productNickname = null, serialNo=null, price=null, invoiceId=null, isValidate=null, productPhoto=null, claimQty=null, createTimestamp=null, invoicePhoto=null, warrantyPhoto=null, policyStartDate=null, policyEndDate=null, policyTimestamp=null} = {}) {
        // their attribute from the class
        this._uuid = uuid; 
        this._productNickname = productNickname;
        this._serialNo = serialNo;
        this._price = price;
        this._invoiceId = invoiceId;
        this._isValidate = isValidate;
        this._productPhoto = productPhoto;
        this._claimQty = claimQty;
        this._createTimestamp = createTimestamp;
        this._invoicePhoto = invoicePhoto;
        this._warrantyPhoto = warrantyPhoto;
        this._policyStartDate = policyStartDate;
        this._policyEndDate = policyEndDate; 
        this._policyTimestamp = policyTimestamp;
        // relationship
        this._product = null;           // from product class
        this._customer = null;          // from customer class
        this._claimLog = [];            // from claimLog class
        this._productCategory = [];     // from productCategory class
        this._retailerBranch = null;    // from retailer branch
        this._policy = [];              // from policy class
    }

    //CRUD method
    _create() {
        console.log(this);
        return db.execute(
            'INSERT INTO purchased_product (product_nickname, serial_no, product_no, customer_id, price, invoice_id, create_timestamp, branch_id, retailer_id, receipt_photo, is_validate, product_photo, claim_qty, warranty_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this._productNickname,
            this._serialNo,
            this._product.getProperty.productNo,
            this._customer.getProperty.customerId,
            this._price,
            this._invoiceId,
            this._createTimestamp,
            this._retailerBranch.getProperty.branchId,
            this._retailerBranch.getProperty.retailerId,
            this._invoicePhoto,
            this._isValidate,
            this._productPhoto,
            this._claimQty,
            this._warrantyPhoto]
        );
    }

    static _readByUuid(uuid) {
        return db.execute(
            'SELECT * FROM purchased_product WHERE uuid = ?',
            [uuid]
        );
    };

    static _readByCustomerId(customerId) {
        return db.execute(
            'SELECT * FROM purchased_product WHERE customer_id = ?',
            [customerId]
        )
    }

    _read() {
        return db.execute(
            'SELECT * FROM purchased_product WHERE uuid = ?',
            [this._uuid]
        );
    };


    _update() {
        return db.execute(
            'UPDATE purchased_product SET product_nickname = ?, serial_no = ? AND product_no = ?, customer_id = ?, price = ?, invoice_id = ?, create_timestamp = ?, branch_id =?, retailer_id = ?, receipt_photo = ?, is_validate = ?, product_photo = ?, claim_qty = ?, warranty_photo = ? WHERE   ',
            [this.productNickname,
            this._serialNo,
            this._product.getProperty.productNo,
            this._customer.getProperty.customerId,
            this._price,
            this._invoiceId,
            this._createTimestamp,
            this._retailerBranch.getProperty.branchId,
            this._retailerBranch.getProperty.retailerId,
            this._receiptPhoto,
            this._isValidate,
            this._productPhoto,
            this._claimQty,
            this._warrantyPhoto,
            this._uuid]
        );              
    };

    static _deleteByuuid(uuid) {
        return db.execute(
            'DELETE FROM purchased_product WHERE uuid = ?',
            [uuid]
        );
    }   

    _delete() {
        return db.execute(
            'DELETE FROM purchased_product WHERE uuid = ?',
            [this._uuid]
        )
    }

    //Problem Domain Getter&Setter
    get getProperty () {
        return {
            uuid: this._uuid,
            serialNo: this._serialNo,
            price: this._price,
            invoiceId: this._invoiceId,
            isValidate: this._isValidate,
            productPhoto: this._productPhoto,
            claimQty: this._claimQty,
            createTimestamp: this.createTimestamp,
            invoicePhoto: this._invoicePhoto,
            warrantyPhoto: this._warrantyPhoto,
            policyStartDate: this._policyStartDate,
            policyEndDate: this._policyEndDate,
            policyTimestamp: this._policyTimestamp,
            product: this._product,
            customer: this._customer,   
            claimLog: this._claimLog,
            productCategory: this._productCategory,
            retailerBranch: this._retailerBranch,
            policy: this._policy
        };
    };

    set setProperty({
        // set its own property
        // destructuring object as parameter by using old values as a default.
        uuid = this._uuid,
        productNickname = this._productNickname,
        serialNo = this._serialNo,
        price = this._price,
        invoiceId = this._invoiceId,
        isValidate = this._isValidate,
        productPhoto = this._productPhoto,
        claimQty = this._claimQty,
        createTimestamp = this._createTimestamp,
        invoicePhoto = this._invoicePhoto,
        warrantyPhoto = this._warrantyPhoto
    }) {
        //check datatype
        checkType(uuid, 'Number')
        checkType(productNickname, 'String');
        checkType(serialNo, 'String');
        checkType(price, 'Number');
        checkType(invoiceId, 'String');
        checkType(isValidate, 'Boolean');
        checkType(productPhoto, 'String');
        checkType(claimQty, 'Number');
        checkType(createTimestamp, 'String');
        checkType(invoicePhoto, 'String');
        checkType(warrantyPhoto, 'String');

        //assign to private vaiable
        this._uuid = uuid;
        this._productNickname = productNickname;
        this._serialNo = serialNo;
        this._price = price;
        this._invoiceId = invoiceId;
        this._isValidate = isValidate;
        this._productPhoto = productPhoto;
        this._claimQty = claimQty;
        this._createTimestamp = createTimestamp;
        this._invoicePhoto = invoicePhoto;
        this._warrantyPhoto = warrantyPhoto;
    }

    addProduct(product){
        checkType(product, 'Product');
        this._product = product;
        return;
    }

    addCustomer(customer) {
        checkType(customer, 'Customer');
        this._customer = customer;
        return;     
    }

    addRetailerBranch(retailerBranch) {
        checkType(retailerBranch, 'RetailerBranch');
        this._retailerBranch = retailerBranch;
        return;
    }

    addClaimLog(claimLog) {
        checkType(claimLog, 'ClaimLog');
        this._claimLog.push(claimLog);
        return;
    }

    editClaimLog(claimLog, obj = {}) {
        checkType(claimLog, 'ClaimLog');
        const index = this.claimLog.indexOf(claimLog);
        if(index > -1) {
            this._claimLog[index] = claimLog.setProperty(obj);
        }
        return;
    }

    deleteClaimLog(claimLog) {
        checkType(claimLog, 'ClaimLog');
        const index = this._claimLog.indexOf(claimLog);
        if(index > -1) {
            this._claimLog.splice(index, 1);
        }
        return;
    }

    addProductCategory(productCategory) {
        checkType(productCategory, 'ProductCategory');
        this._productCategory.push(productCategory);
        return;
    }

    addPolicy(policy) {
        checkType(policy, 'Policy');
        this._policy.push(policy);
        return;
    }
}
