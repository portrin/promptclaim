const Role = require('./role-model');

module.exports = class RootAccount {
    constructor(rootId, username, password, type) {
        this._rootId = rootId;
        this._username = username;
        this._password = password;
        this._type = type;
        this._Role = Role; // Composition Role class
    }
    
    // method
}