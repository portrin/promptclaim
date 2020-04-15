const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Permission {
    constructor({per_id = null, per_name = null, per_description = null, per_module = null} = {}){
        // their own class atrribute ref. from class diagram
        this._perId = per_id
        this._perName = per_name
        this._perDescription = per_description 
        this._perModule = per_module

        //Relationship to its neighbor classes
        this._role = [] //relationship to Role class
        this._group = [] //relationship to Group class
    }

    //CRUD
    _create () {
        return db.execute(
            'INSERT INTO Permission(per_id, per_name, per_description, per_module) VALUES(?,?,?,?)',
            [this._perId,
            this._perName,
            this._perDescription,
            this._perModule
            ])
    }

    static _readByPerId (perId) {
        return db.execute(
            'SELECT * FROM Permission WHERE per_id = ?',
            [perId])
    }

    static _read() {
        return db.execute(
            'SELECT * FROM Permission'
        )
    }

    _update () {
        return db.execute(
            'UPDATE Permission SET per_name = ?, per_description = ?, per_module= ? WHERE per_id = ?', 
            [this._perName,
            this._perDescription,
            this._perModule,
            this._perId
            ]);
    }

    _delete () {
        return db.execute(
            'DELETE FROM Permission WHERE per_id = ?', 
            [this._perId])
    }

     // getter and setter
     get getProperty() {
        return {
            perId:this._perId,
            perName:this._perName,
            perDescription: this._perDescription, 
            perModule: this._perModule,
            role: this._role,
            group: this._group
        };
    }

    set setProperty({  // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        perId = this._perId,
        perName = this._perName,
        perDescription = this._perDescription, 
        perModule = this._perModule,
    }) {
        // check datatype
        checkType(perId, 'String');
        checkType(perName, 'String');
        checkType(perDescription, 'String');
        checkType(perModule, 'String');
        // assign to private variables
        this._perId = perId;
        this._perName = perName;
        this._perDescription = perDescription; 
        this._perModule = perModule;
    }

    addGroup(group) {
        checkType(group, 'Group');
        this._group.push(group);
        return;
    }

    addRole(role) {
        checkType(role, 'Role');
        this._role.push(role);
        return;
    }

}