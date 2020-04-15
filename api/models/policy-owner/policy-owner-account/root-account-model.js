const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class RootAccount {
    constructor({root_id = null, username = null, password = null, type = null} = {}) {
        // their own class atrribute ref. from class diagram
        this._rootId = root_id
        this._username = username
        this._password = password
        this._type = type

        //Relationship to its neighbor classes
        this._role = []         // relationship (Composition) Role class
        this._belongTo = null;
    }
    
    //CRUD
    _create () {
        return db.execute(
            'INSERT INTO Root_account(root_id, username, password, type) VALUES(?, ?, ?, ?)',
            [this._rootId,
            this._username,
            this._password,
            this._type]);
    }

    static _readByRootId (rootId) {
        return db.execute(
            'SELECT * FROM Root_account WHERE root_id = ?',
            [rootId]
            )
    }

    static _read() {
        return db.execute(
            'SELECT * FROM Root_account'
        )
    }

    _update () {
        return db.execute(
            'UPDATE Root_account SET username = ?, password = ?, type = ? WHERE root_id = ?', 
            [this._username,
            this._password,
            this._type,
            this._rootId,]
        );
    }

    _delete () {
        return db.execute(
            'DELETE FROM Root_account WHERE root_id = ?', 
            [this._rootId])
    }
    // getter and setter
    get getProperty() {
        return {
            rootId: this._rootId,
            username: this._username,
            password: this._password,
            type: this._type,
            role: this._role, // Composition Role class
            retailer: this._retailer,
            thirdParty: this._thirdParty,
            supplier: this._supplier
        };
    }

    set setProperty({  // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        rootId =this._rootId,
        username = this._username,
        password = this._password,
        type = this._type
    }) {
        // check datatype
        checkType(rootId, 'String');
        checkType(username, 'String');
        checkType(password, 'String');
        checkType(type, 'String');
        // assign to private variables
        this._rootId = rootId;
        this._username = username;
        this._password = password;
        this._type = type;
    }
}