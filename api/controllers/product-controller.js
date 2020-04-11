const PurchasedProduct = require('../models/product/purchased-product-model')

//get all products
exports.getAllProducts = (req, res ,next) => {
    PurchasedProduct._read()
    .then(([products]) => {
        res.send(products)
    })
    .catch(err => {
        console.log(err);
    });
};



//get a product by serialNo & productNo
exports.getProduct = (req, res, next) => {
    const serialNo = req.params.serialNo;
    const productNo = req.params.productNo;
    PurchasedProduct._readByKey(serialNo, productNo)
    .then(([product]) => {
        res.send(product[0]);
    })
    .catch(err => {
        console.log(err);
    })
};



//route to form-page for adding product
exports.getAddProduct = (req, res, next) => {
    res.send('productAdd form')
};


//add a product
exports.postAddProduct = (req, res, next) => {
    const serialNo = req.body.serialNo;
    const productNo = req.body.productNo;
    const customerId = req.body.customerId;
    const price = req.body.price;
    const invoiceID = req.body.invoiceID;
    const timestamp = req.body.timestamp;
    const branchID = req.body.branchID;
    const retailerID = req.body.retailerID;
    const receiptPhoto = req.body.receiptPhoto;
    const isValidate = req.body.isValidate;
    const productPhoto = req.body.productPhoto;
    const claimQty = req.body.claimQty;
    const warrantyPhoto = req.body.warrantyPhoto;
    const product = new PurchasedProduct(
                            serialNo,
                            productNo,
                            customerId, 
                            price, 
                            invoiceID, 
                            timestamp, 
                            branchID, 
                            retailerID, 
                            receiptPhoto, 
                            isValidate, 
                            productPhoto, 
                            claimQty,
                            warrantyPhoto
                            );                           
    
    product._create()
    .then(() => {
        console.log('Added!');
        res.send('Added!');
    })
    .catch(err => {
        console.log(err); 
    });

};


//delete a product
exports.deleteProduct = (req, res, next) => {
    const serialNo = req.params.serialNo;
    const productNo = req.params.productNo;
    PurchasedProduct._deleteByKey(serialNo, productNo)
    .then(() => {
        console.log('Product Deleted!');
        res.send('Product Deleted!')
    })
    .catch(err => {
        console.log(err);        
    })
};


//edit a product
exports.postEditProduct = (req, res, next) => {
    const serialNo = req.body.serialNo;
    const productNo = req.body.productNo;
    const customerId = req.body.customerId;
    const price = req.body.price;
    const invoiceID = req.body.invoiceID;
    const timestamp = req.body.timestamp;
    const branchID = req.body.branchID;
    const retailerID = req.body.retailerID;
    const receiptPhoto = req.body.receiptPhoto;
    const isValidate = req.body.isValidate;
    const productPhoto = req.body.productPhoto;
    const claimQty = req.body.claimQty;
    const warrantyPhoto = req.body.warrantyPhoto;
    const updatedProduct = new PurchasedProduct(
                            serialNo,
                            productNo,
                            customerId, 
                            price, 
                            invoiceID, 
                            timestamp, 
                            branchID, 
                            retailerID, 
                            receiptPhoto, 
                            isValidate, 
                            productPhoto, 
                            claimQty,
                            warrantyPhoto
                            );
    updatedProduct.serialNo = req.params.serialNo;
    updatedProduct.productNo = req.params.productNo;
    updatedProduct._update()
    .then(() => {
        console.log('Product Edited!'); 
        res.send('Product Edited!');
    })
    .catch(err => {
        console.log(err);            
    })
};
                        


//route to form-page for editing product
exports.getEditProduct = (req, res, next) => {
    res.send('Edit Form')
};





 

