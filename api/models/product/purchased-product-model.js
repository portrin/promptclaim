const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class PurchasedProduct {
    constructor({uuid=null, serial_no=null, product_no=null, customer_id=null, product_nickname = null, price=null, invoice_id=null, is_validate=null, product_photo=null, claim_qty=null, create_timestamp=null, invoice_photo=null, warranty_photo=null, policy_start_date=null, policy_end_date=null, timestamp=null} = {}) {
        // their attribute from the class
        this._uuid = uuid; 
        this._serialNo = serial_no;
        this._productNo = product_no;
        this._customerId = customer_id;
        this._productNickname = product_nickname;        
        this._price = price;
        this._invoiceId = invoice_id;
        this._isValidate = is_validate;
        this._productPhoto = product_photo;
        this._claimQty = claim_qty;
        this._createTimestamp = create_timestamp;
        this._invoicePhoto = invoice_photo;
        this._warrantyPhoto = warranty_photo;

        this._policyStartDate = policy_start_date;
        this._policyEndDate = policy_end_date; 
        this._policyTimestamp = timestamp;
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
            'INSERT INTO purchased_product (serial_no, product_no, customer_id, product_nickname, price, invoice_id, create_timestamp, branch_id, retailer_id, receipt_photo, is_validate, product_photo, claim_qty, warranty_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this._serialNo,
            this._productNo,
            this._customerId,
            this._productNickname,     
            this._price,
            this._invoiceId,
            this._createTimestamp,
            this._branchId,
            this._retailerId,
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

    static _read() {
        return db.execute(
            'SELECT * FROM purchased_product'
        );
    }


    _update() {
        return db.execute(
            'UPDATE purchased_product SET serial_no =?, product_no = ?,  customer_id = ?, product_nickname = ?, price = ?, invoice_id = ?, create_timestamp = ?, branch_id =?, retailer_id = ?, receipt_photo = ?, is_validate = ?, product_photo = ?, claim_qty = ?, warranty_photo = ? WHERE uuid = ?   ',        
            [this._serialNo,
            this._productNo,
            this._customerId,
            this._productNickname,
            this._price,
            this._invoiceId,
            this._createTimestamp,
            this._branchId,
            this._retailerId,
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
            productNo: this._productNo,
            customerId: this._customerId,
            productNickname: this._productNickname,
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

}
