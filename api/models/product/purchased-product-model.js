const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class PurchasedProduct {
    constructor({uuid=null, serial_no=null, product_no=null, customer_id=null, product_nickname = null, price=null, invoice_id=null, create_timestamp=null, retailer_branch_id=null, retailer_id=null, invoice_photo=null, is_validate=null, product_photo=null, claim_qty=null, warranty_photo=null} = {}) {
        // their attribute from the class
        this._uuid = uuid; 
        this._serialNo = serial_no;
        this._productNo = product_no;
        this._customerId = customer_id;
        this._productNickname = product_nickname;        
        this._price = price;
        this._invoiceId = invoice_id;
        this._createTimestamp = create_timestamp;
        this._retailerBranchId = retailer_branch_id;
        this._retailerId = retailer_id
        this._invoicePhoto = invoice_photo;
        this._isValidate = is_validate;
        this._productPhoto = product_photo;
        this._claimQty = claim_qty;  
        this._warrantyPhoto = warranty_photo;

        // this._policyStartDate = policy_start_date;
        // this._policyEndDate = policy_end_date; 
        // this._policyTimestamp = timestamp;

    }

    //CRUD method
    _create() {
        console.log(this);
        return db.execute(
            'INSERT INTO purchased_product (serial_no, product_no, customer_id, product_nickname, price, invoice_id, create_timestamp, retailer_branch_id, retailer_id, invoice_photo, is_validate, product_photo, claim_qty, warranty_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this._serialNo,
            this._productNo,
            this._customerId,
            this._productNickname,     
            this._price,
            this._invoiceId,
            this._createTimestamp,
            this._retailerBranchId,
            this._retailerId,
            this._invoicePhoto,
            this._isValidate,
            this._productPhoto,
            this._claimQty,
            this._warrantyPhoto]
        );
    }

    static _readByUuid(uuid, customerId) {
        return db.execute(
            'SELECT p.uuid, serial_no, p.product_no, customer_id, product_nickname, price, invoice_id, create_timestamp, p.retailer_branch_id, p.retailer_id, invoice_photo, is_validate, product_photo, claim_qty, warranty_photo, c.category_id, category_name, product_model, product_name, product_description, su.supplier_id, supplier_description, supplier_name, supplier_contact, supplier_address, retailer_branch_name, retailer_branch_address, retailer_branch_contact, retailer_name, retailer_contact, retailer_description, retailer_hq_address FROM purchased_product p LEFT JOIN pp_classify_as c ON p.uuid = c.uuid LEFT JOIN product_category pc ON pc.category_id = c.category_id LEFT JOIN product pd ON pd.product_no = p.product_no LEFT JOIN supplier su ON pd.supplier_id = su.supplier_id LEFT JOIN retailer_branch rr ON rr.retailer_branch_id = p.retailer_branch_id LEFT JOIN retailer rrr ON rrr.retailer_id = p.retailer_id WHERE p.uuid =? AND p.customer_id = ?',
            [uuid, customerId]
        );
    };

    static _readByUuidRetailer(uuid, retailerId) {
        return db.execute(
            'SELECT * FROM purchased_product WHERE uuid = ? AND retailer_id = ?',
            [uuid, retailerId]
        );
    };

    static _readByCustomerId(customerId) {
        return db.execute(
            'SELECT p.uuid, serial_no, p.product_no, customer_id, product_nickname, price, invoice_id, create_timestamp, p.retailer_branch_id, p.retailer_id, invoice_photo, is_validate, product_photo, claim_qty, warranty_photo, c.category_id, category_name, product_model, product_name, product_description, su.supplier_id, supplier_description, supplier_name, supplier_contact, supplier_address, retailer_branch_name, retailer_branch_address, retailer_branch_contact, retailer_name, retailer_contact, retailer_description, retailer_hq_address FROM purchased_product p LEFT JOIN pp_classify_as c ON p.uuid = c.uuid LEFT JOIN product_category pc ON pc.category_id = c.category_id LEFT JOIN product pd ON pd.product_no = p.product_no LEFT JOIN supplier su ON pd.supplier_id = su.supplier_id LEFT JOIN retailer_branch rr ON rr.retailer_branch_id = p.retailer_branch_id LEFT JOIN retailer rrr ON rrr.retailer_id = p.retailer_id WHERE p.customer_id = ?',
            [customerId]
        )
    }

    static _readByRetailerId(retailerId) {
        return db.execute(
            'SELECT P1.uuid, serial_no, P1.product_no, product_model, product_name, price, invoice_id, create_timestamp, retailer_branch_id, retailer_id, invoice_photo, is_validate, product_photo, claim_qty, warranty_photo, P1.customer_id, firstname, lastname, phone_no, address_id, house_no, street, sub_district, district, province, zipcode, claim_id, status, C1.timestamp, P2.policy_id, policy_start_date, policy_end_date, P2.timestamp, policy_period, date_created FROM purchased_product P1 LEFT JOIN product P ON P1.product_no = P.product_no LEFT JOIN claim_log C1 ON P1.uuid = C1.uuid LEFT JOIN product_has_policy P2 ON P1.uuid = P2.uuid LEFT JOIN policy P3 ON P2.policy_id = P3.policy_id LEFT JOIN customer C2 ON P1.customer_id = C2.customer_id LEFT JOIN customer_address C3 ON C2.customer_id = C3.customer_id WHERE retailer_id = ?',
            [retailerId]            
        );
    }

    static _readByCategoryIdRetailer(categoryId, retailerId) {
        return db.execute(
            'SELECT * FROM purchased_product NATURAL JOIN pp_classify_as WHERE retailer_id = ? AND category_id = ?;',
            [retailerId, categoryId]
        );
    }

    _read() {
        return db.execute(
            'SELECT * FROM purchased_product WHERE uuid = ?',
            [this._uuid]
        );
    };

    static _readByProductNo(productNo, customerId) {
        return db.execute(
            'SELECT p.uuid, serial_no, p.product_no, customer_id, product_nickname, price, invoice_id, create_timestamp, branch_id, retailer_id, invoice_photo, is_validate, product_photo, claim_qty, warranty_photo, c.category_id, category_name, product_model, product_name, product_description, su.supplier_id, supplier_description, name, contact, address, root_id, policy_owner_id FROM purchased_product p LEFT JOIN pp_classify_as c ON p.uuid = c.uuid LEFT JOIN product_category pc ON pc.category_id = c.category_id LEFT JOIN product pd ON pd.product_no = p.product_no LEFT JOIN supplier su ON pd.supplier_id = su.supplier_id WHERE p.product_no =? AND p.customer_id = ?',
            [productNo, customerId]
        );
    }


    _update(uuid) {
        return db.execute(
            'UPDATE purchased_product SET serial_no =?, product_no = ?,  customer_id = ?, product_nickname = ?, price = ?, invoice_id = ?, create_timestamp = ?, retailer_branch_id =?, retailer_id = ?, invoice_photo = ?, is_validate = ?, product_photo = ?, claim_qty = ?, warranty_photo = ? WHERE uuid = ?   ',        
            [this._serialNo,
            this._productNo,
            this._customerId,
            this._productNickname,     
            this._price,
            this._invoiceId,
            this._createTimestamp,
            this._retailerBranchId,
            this._retailerId,
            this._invoicePhoto,
            this._isValidate,
            this._productPhoto,
            this._claimQty,
            this._warrantyPhoto,
            uuid]
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
            createTimestamp: this.createTimestamp,            
            retailerBranchId: this._retailerBranchId,
            retailerId: this._retailerId,
            invoicePhoto: this._invoicePhoto,
            isValidate: this._isValidate,
            productPhoto: this._productPhoto,
            claimQty: this._claimQty,
            warrantyPhoto: this._warrantyPhoto
            // policyStartDate: this._policyStartDate,
            // policyEndDate: this._policyEndDate,
            // policyTimestamp: this._policyTimestamp,
          
        };
    };

    set setProperty({
        // set its own property
        // destructuring object as parameter by using old values as a default.
        uuid = this._uuid,
        serialNo = this._serialNo,
        productNo = this._productNo,
        customerId = this._customerId,
        productNickname = this._productNickname,      
        price = this._price,
        invoiceId = this._invoiceId,
        createTimestamp = this._createTimestamp,
        retailerBranchId = this._retailerBranchId,
        retailerId = this._retailerId,
        invoicePhoto = this._invoicePhoto,
        isValidate = this._isValidate,
        productPhoto = this._productPhoto,
        claimQty = this._claimQty,
        warrantyPhoto = this._warrantyPhoto
    }) {
        //check datatype
        checkType(uuid, 'String');
        checkType(productNo, 'String');
        checkType(customerId, 'String');
        checkType(retailerBranchId, 'String');
        checkType(retailerId, 'String');
        checkType(invoicePhoto, 'String');
        checkType(productNickname, 'String');
        checkType(serialNo, 'String');
        checkType(price, 'Number');
        checkType(invoiceId, 'String');
        checkType(isValidate, 'Number');
        checkType(productPhoto, 'String');
        checkType(claimQty, 'Number');
        checkType(createTimestamp, 'String');
        checkType(invoicePhoto, 'String');
        checkType(warrantyPhoto, 'String');

        //assign to private vaiable
        this._uuid = uuid; 
        this._serialNo = serialNo;
        this._productNo = productNo;
        this._customerId = customerId;
        this._productNickname = productNickname;        
        this._price = price;
        this._invoiceId = invoiceId;
        this._createTimestamp = createTimestamp;
        this._retailerBranchId = retailerBranchId;
        this._retailerId = retailerId
        this._invoicePhoto = invoicePhoto;
        this._isValidate = isValidate;
        this._productPhoto = productPhoto;
        this._claimQty = claimQty;  
        this._warrantyPhoto = warrantyPhoto;
    }

}

