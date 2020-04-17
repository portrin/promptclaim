const PurchasedProduct = require('../../models/product/purchased-product-model');
const jwt = require('jsonwebtoken');

//get all products
exports.getCustomerPurchasedProducts = async (req, res ,next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const result = (await PurchasedProduct._readByCustomerId(customerId)) [0];
    res.send(result);   
};


//get product by productNo
exports.getPurchasedProductByProductNo = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const productNo = req.params.productNo;
    const result = (await PurchasedProduct._readByProductNo(productNo, customerId)) [0] ;
    res.send(result);   
};

//get product by uuid
exports.getPurchasedProductByUuid = async (req, res, next) => {
    const customerId = jwt.decode(req.headers.authorization).sub;
    const uuid = req.params.uuid;
    const result = (await PurchasedProduct._readByUuid(uuid, customerId)) [0];
    res.send(result);
}


//add a product
exports.postAddPurchasedProduct = async (req, res, next) => {
    const uuid = req.body.uuid;
    const serial_no = req.body.serialNo;
    const product_no = req.body.productNo;
    const customer_id = jwt.decode(req.headers.authorization).sub;
    const product_nickname = req.body.productNickname;
    const price = req.body.price;
    const invoice_id = req.body.invoiceId;
    const create_timestamp = req.body.createTimestamp;
    const branch_id = req.body.branchId;
    const retailer_id = req.body.retailerId;
    const invoice_photo = req.body.invoicePhoto;
    const is_validate = req.body.isValidate;
    const product_photo = req.body.productPhoto;
    const claim_qty = req.body.claimQty;
    const warranty_photo = req.body.warrantyPhoto;
    const product = new PurchasedProduct({
                            uuid,
                            serial_no,
                            product_no,
                            customer_id,
                            product_nickname, 
                            price, 
                            invoice_id, 
                            create_timestamp, 
                            branch_id, 
                            retailer_id, 
                            invoice_photo, 
                            is_validate, 
                            product_photo, 
                            claim_qty,
                            warranty_photo
                            });
    console.log(product);
                   
    const result = (await product._create()) [0];
    res.send(result);  

};


//delete a product
exports.deletePurchasedProductByUuid = async (req, res, next) => {
    const uuid = req.params.uuid;
    await PurchasedProduct._deleteByuuid(uuid);
    res.send(`Product ${uuid} is deleted!`)
};


//edit a product
exports.postEditPurchasedProductByUuid = async (req, res, next) => {
    const uuid = req.params.uuid;
    const serial_no = req.body.serialNo;
    const product_no = req.body.productNo;
    const customer_id = jwt.decode(req.headers.authorization).sub;
    const product_nickname = req.body.productNickname;
    const price = req.body.price;
    const invoice_id = req.body.invoiceId;
    const create_timestamp = req.body.createTimestamp;
    const branch_id = req.body.branchId;
    const retailer_id = req.body.retailerId;
    const invoice_photo = req.body.invoicePhoto;
    const is_validate = req.body.isValidate;
    const product_photo = req.body.productPhoto;
    const claim_qty = req.body.claimQty;
    const warranty_photo = req.body.warrantyPhoto;
    const updatedProduct = new PurchasedProduct({
                            uuid,
                            serial_no,
                            product_no,
                            customer_id,
                            product_nickname, 
                            price, 
                            invoice_id, 
                            create_timestamp, 
                            branch_id, 
                            retailer_id, 
                            invoice_photo, 
                            is_validate, 
                            product_photo, 
                            claim_qty,
                            warranty_photo
                            });    
    console.log(updatedProduct);
    await updatedProduct._update(uuid);
    res.send(`Product ${uuid} is updated!`)
    
};
                        





 

