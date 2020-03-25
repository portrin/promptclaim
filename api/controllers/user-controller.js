const dummyUsers = require('../models/user-model');

exports.getUserInfoId = (req,res,next) => {
    const {id} = req.params
    const result = dummyUsers.find(user => user.id === id )
    res.send(result)
}

//exports.editUserById = (res,req,next) => {
//
//}