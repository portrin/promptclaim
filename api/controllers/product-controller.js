const Product = require('../models/product-model')

//get all products
exports.getAllProducts = (req, res ,next) => {
    Product.fetchAll()
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
    Product.findById(serialNo, productNo)
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
    const accountID = req.body.accountID;
    const price = req.body.price;
    const invoiceID = req.body.invoiceID;
    const timestamp = req.body.timestamp;
    const branchID = req.body.branchID;
    const retailerID = req.body.retailerID;
    const receiptPhoto = req.body.receiptPhoto;
    const isValidate = req.body.isValidate;
    const productPhoto = req.body.productPhoto;
    const claimQty = req.body.claimQty;
    const product = new Product(
                            serialNo,
                            productNo,
                            accountID, 
                            price, 
                            invoiceID, 
                            timestamp, 
                            branchID, 
                            retailerID, 
                            receiptPhoto, 
                            isValidate, 
                            productPhoto, 
                            claimQty
                            );
                            console.log(product);
                            
    
    product.save()
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
    Product.deleteById(serialNo, productNo)
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
    const accountID = req.body.accountID;
    const price = req.body.price;
    const invoiceID = req.body.invoiceID;
    const timestamp = req.body.timestamp;
    const branchID = req.body.branchID;
    const retailerID = req.body.retailerID;
    const receiptPhoto = req.body.receiptPhoto;
    const isValidate = req.body.isValidate;
    const productPhoto = req.body.productPhoto;
    const claimQty = req.body.claimQty;
    const updatedProduct = new Product(
                            serialNo,
                            productNo,
                            accountID, 
                            price, 
                            invoiceID, 
                            timestamp, 
                            branchID, 
                            retailerID, 
                            receiptPhoto, 
                            isValidate, 
                            productPhoto, 
                            claimQty
                            );
    const serialNoParams = req.params.serialNo;
    const productNoParams = req.params.productNo;
    updatedProduct.update(serialNoParams, productNoParams)
    .then(() => {
        console.log('Product Edited!'); 
        res.send('Product Edited!');
    })
    .catch(err => {
        console.log(err);            
    })
};
                        



// exports.getEditProduct = (req, res, next) => {

// };





 

