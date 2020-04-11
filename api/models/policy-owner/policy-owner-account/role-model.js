const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Role {
    constructor({username = null, password = null, roleName = null, roleDescription = null} = {}) {
        this._username = username;
        this._password = password;
        this._roleName = roleName;
        this._roleDescription = roleDescription;
        this._rootAccount = null;
        this._permission =[];
        this._group = [];
    }

    //CRUD
    _create() {
        return db.execute(
            'INSERT INTO Role (root_id, username, password, role_name, role_description) VALUES(?,?,?,?,?)',
            [this._rootAccount.getProperty.rootId,
            this._username,
            this._password,
            this._roleName,
            this._roleDescription
            ])
    }

    static _readByRootId(rootId) {
        //read role of a root account
        return db.execute(
            'SELECT * FROM Role WHERE root_id =?',
            [rootId])
    }
    
    static _readByPK(rootId){
        return db.execute(
            'SELECT * FROM Role WHERE root_id =? AND username =?',
            [rootId, this._username])
    }

    static _read(){
        return db.execute(
            'SELECT * FROM Role'
        )
    }

    _update() {
        return db.execute(
            'UPDATE `Role` SET username = ?, password = ?, role_name = ? , role_description = ? WHERE root_id =? AND username = ?', 
            [this._password,
            this._roleName,
            this._roleDescription,
            this._rootAccount.getProperty.rootId,
            this._username]
        );
    }

    _delete() {
        return db.execute(
            'DELETE FROM Role WHERE root_id = ? AND username =?', 
            [this._rootAccount.getProperty.rootId, this._username])
    }

    
    // getter and setter
    get getProperty() {
        return {
        username: this._username,
        password: this._password,
        roleName: this._roleName,
        roleDescription: this._roleDescription,
        rootAccount: this._rootAccount,
        permission: this._permission,
        group: this._group
        };
    }

    set setProperty({  // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        username = this._username,
        password = this._password,
        roleName = this._roleName,
        roleDescription = this._roleDescription
    }) {
        // check datatype
        checkType(username, 'String');
        checkType(password, 'String');
        checkType(roleName, 'String');
        checkType(roleDescription, 'String');
        // assign to private variables
        this._username = username;
        this._password = password;
        this._roleName = roleName;
        this._roleDescription = roleDescription;

    }
}