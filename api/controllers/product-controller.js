const PurchasedProduct = require('../models/PurchasedProduct-model')

//get all products
exports.getAllProducts = (req, res ,next) => {
    PurchasedProduct.fetchAll()
    .then(([products, field]) => {
        res.send(products);
        
    })
    .catch(err => {
        console.log(err);
    });
};

//get a product by serialNo & productNo
exports.getProduct = (req, res, next) => {
    const serialNo = req.params.serialNo;
    const productNo = req.params.productNo;
    PurchasedProduct.findById(serialNo, productNo)
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
    PurchasedProduct.deleteById(serialNo, productNo)
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
                        


//edit form page
exports.getEditProduct = (req, res, next) => {
    res.send('Edit Form')
};



//search by product name
exports.getSearchProductByName = (req, res, next) => {
    const productName = req.params.productName;
    PurchasedProduct.searchByName(productName)
    .then((result) => {
        console.log('Search by name is done!');
        res.send(result[0]);        
    })
    .catch(err => {
        console.log(err);        
    });    
};


//search by serial no.
exports.getSearchProductBySerialNo = (req, res, next) => {
    const serialNo = req.params.serialNo;
    PurchasedProduct.searchBySerialNo(serialNo)
    .then((result) => {
        console.log('Search by serialNo is done!');
        res.send(result[0]);        
    })
    .catch(err => {
        console.log(err);        
    });    
};

//sort by name
exports.getSortByName = (req, res, next) => {
    PurchasedProduct.sortByName()
    .then(([result, field]) => {
        res.send(result);
        console.log('Sort by Name is done!');
        console.log();      

    })
    .catch(err => {
        console.log(err);
        
    });
}





 

