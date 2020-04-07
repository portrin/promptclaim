const Role = require('./role-model');

module.exports = class RootAccount {
    constructor(rootId, username, password, type) {
        this._rootId = rootId;
        this._username = username;
        this._password = password;
        this._type = type;
        this._role = []; // Composition Role class
        this._retailer = [];
        this._thirdParty = [];
        this._supplier = [];
    }
    
    _create () {
        return db.execute('INSERT INTO Root_account(root_id, username, password, type) VALUES(root_id=?, username=?, password=?, type=?)',
        [this._rootId,
        this._username,
        this._password,
        this._type]);
    }

    static _read () {
        return db.execute('SELECT * FROM Root_account WHERE root_id =?',[this._rootId])
    }

    _update () {
        return db.execute(
            'UPDATE `Root_account` SET username=?, password=?, type=? WHERE root_id=?', 
            [this._username,
            this._password,
            this._type,
            this._rootId,]
        );
    }

    _delete () {
        return db.execute('DELETE FROM Root_account WHERE root_id = ?', [this._rootId])
    }
}