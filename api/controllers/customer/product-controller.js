const PurchasedProduct = require('../../models/product/purchased-product-model');
const ProductCategory = require('../../models/product/product-category-model');
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

//add product category
exports.postAddPurchasedProductCategory = async (req, res, next) => {
    const category_id = req.body.categoryId;
    const category_name = req.body.categoryName;
    const productCategory = new ProductCategory(category_id, category_name);
    const result = (await productCategory._create()) [0];
    res.send(result) 
}

//delete product category
exports.deletePurchasedProductCategory = async (req, res, next) => {
    const categoryIdParams = req.params.categoryId;
    await ProductCategory._delete(categoryIdParams);
    res.send(`Category ${categoryIdParams} is deleted! `)
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
    const retailer_branch_id = req.body.retailerBranchId;
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
                            retailer_branch_id, 
                            retailer_id, 
                            invoice_photo, 
                            is_validate, 
                            product_photo, 
                            claim_qty,
                            warranty_photo
                            });
                   
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
    const serialNo = req.body.serialNo;
    const productNo = req.body.productNo;
    const customerId = jwt.decode(req.headers.authorization).sub;
    const productNickname = req.body.productNickname;
    const price = req.body.price;
    const invoiceId = req.body.invoiceId;
    const createTimestamp = req.body.createTimestamp;
    const retailerBranchId = req.body.retailerBranchId;
    const retailerId = req.body.retailerId;
    const invoicePhoto = req.body.invoicePhoto;
    const isValidate = req.body.isValidate;
    const productPhoto = req.body.productPhoto;
    const claimQty = req.body.claimQty;
    const warrantyPhoto = req.body.warrantyPhoto;
    const updatedProduct = new PurchasedProduct( (await PurchasedProduct._readByUuid(uuid, customerId)) [0][0] );
    updatedProduct.setProperty = {
                            uuid,
                            serialNo,
                            productNo,
                            customerId,
                            productNickname, 
                            price, 
                            invoiceId, 
                            createTimestamp, 
                            retailerBranchId, 
                            retailerId, 
                            invoicePhoto, 
                            isValidate, 
                            productPhoto, 
                            claimQty,
                            warrantyPhoto
                            };    
            
                            console.log(updatedProduct);
    const status = await updatedProduct._update(uuid);
    
    res.send(status)
    
};
                        





 

