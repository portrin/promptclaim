const db = require('../config/db');

exports.userDefault = (req,res,next) => {
    res.send("Log in")
    console.log(connection)
}

exports.getUserInfoId = (req,res,next) => {
    const id = req.params.id
    if(!id){
        res.send("No user existed")
    }else{
      db.query("SELECT * FROM customer WHERE customer_id LIKE '%"+id +"%'", (err,result) => {
          res.send({
              customer: result
          })
      })
    }
    
    //res.send("Hello: "+ id)
}

exports.editUserById = (req,res,next) => {
    const account_id = req.params.acctId
    const address_id = req.params.addrId
    if(!id){
        res.send("No user existed")
    }else{
        const update_username = req.body.username;
        const update_password = req.body.password; 
        const update_email = req.body.email ;
        const update_house_no = req.body.house_no;
        const update_street = req.body.street; 
        const update_sub_district = req.body.sub_district; 
        const update_district = req.body.district;
        const update_province = req.body.province; 
        const update_zipcode = req.body.update_zipcode 
        db.query('UPDATE `customer_account` INNER JOIN `customer_address` ON address_id = ? SET username = ?, password = ?, email = ?, house_no = ?, street = ?, sub_district = ? , district = ?, province = ?, zipcode = ? WHERE account_id =?', [address_id ,update_username, update_password, update_email, update_house_no, update_street, update_sub_district, update_district, update_province, update_zipcode, account_id], (err, results) => {
            res.send({
                customer: result

            })
        })
    }
}