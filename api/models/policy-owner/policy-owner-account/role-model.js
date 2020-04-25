const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Role {
    constructor({root_id = null,username = null, password = null, role_name = null, role_description = null} = {}) {
        // their own class atrribute ref. from class diagram
        this._rootId = root_id
        this._username = username
        this._password = password
        this._roleName = role_name
        this._roleDescription = role_description

        //Relationship to its neighbor classes
        this._rootAccount = null    //relationship to class RootAccount
        this._permission =[]        //relationship to class Permission
        this._group = []            //relationship to class Group
    }

    //CRUD
    _create() {
        return db.execute(
            'INSERT INTO role (root_id, username, password, role_name, role_description) VALUES(?,?,?,?,?)',
            [this._rootId,
            this._username,
            this._password,
            this._roleName,
            this._roleDescription
            ])
    }

    static _readByRootId(rootId) {
        //read role of a root account
        return db.execute(
            'SELECT * FROM role WHERE root_id = ?',
            [rootId]
        )
    }
    
    static _readByPK(rootId, username){
        return db.execute(
            'SELECT * FROM role WHERE root_id = ? AND username = ?',
            [rootId, username])
    }

    _update() {
        return db.execute(
            'UPDATE role SET password = ?, role_name = ? , role_description = ? WHERE root_id = ? AND username = ?', 
            [this._password,
            this._roleName,
            this._roleDescription,
            this._rootId,
            this._username]
        );
    }

    _delete() {
        return db.execute(
            'DELETE FROM role WHERE root_id = ? AND username =?', 
            [this._rootId, this._username])
    }

    
    // getter and setter
    get getProperty() {
        return {
            rootId: this._rootId,
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
        rootId = this._rootId,
        username = this._username,
        password = this._password,
        roleName = this._roleName,
        roleDescription = this._roleDescription
    }) {
        // check datatype
        checkType(rootId, 'String');
        checkType(username, 'String');
        checkType(password, 'String');
        checkType(roleName, 'String');
        checkType(roleDescription, 'String');
        // assign to private variables
        this._rootId = rootId;
        this._username = username;
        this._password = password;
        this._roleName = roleName;
        this._roleDescription = roleDescription;
    }

}