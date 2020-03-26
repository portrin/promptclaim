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
    const branch_id = req.body.branch_id;
    const retailer_id = req.body.retailer_id;
    const receipt_photo = req.body.receipt_photo;
    const is_validate = req.body.is_validate;
    const product_photo = req.body.product_photo;
    const claim_qty = req.body.claim_qty;
    const updatedProduct = new Product(
                            serialNo,
                            productNo,
                            accountID, 
                            price, 
                            invoiceID, 
                            timestamp, 
                            branch_id, 
                            retailer_id, 
                            receipt_photo, 
                            is_validate, 
                            product_photo, 
                            claim_qty
                            );
    const serialNoParams = req.params.serialNo;
    const productNoParams = req.params.productNo;
    updatedProduct.update(serialNoParams, productNoParams)
        .then((product) => {
            console.log('Product Added!'); 
            res.send('Product Added!' + product[0]);
        })
        .catch(err => {
            console.log(err);            
        })
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
    const branch_id = req.body.branch_id;
    const retailer_id = req.body.retailer_id;
    const receipt_photo = req.body.receipt_photo;
    const is_validate = req.body.is_validate;
    const product_photo = req.body.product_photo;
    const claim_qty = req.body.claim_qty;
    const product = new Product(
                            serialNo,
                            productNo,
                            accountID, 
                            price, 
                            invoiceID, 
                            timestamp, 
                            branch_id, 
                            retailer_id, 
                            receipt_photo, 
                            is_validate, 
                            product_photo, 
                            claim_qty
                            );
    product.save()
    .then(() => {
        console.log('Edited!');
        res.send('Edited');
    }).catch(err => {
        console.log(err); 
    });

};



// exports.getEditProduct = (req, res, next) => {

// };





