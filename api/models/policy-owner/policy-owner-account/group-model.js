const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Group {
    constructor({group_id = null, group_name = null, group_description = null} = {}){
        // their own class atrribute ref. from class diagram
        this._groupId = group_id
        this._groupName = group_name
        this._groupDescription = group_description 

        //Relationship to its neighbor classes
        this._permission = [] //relationship to class Permission
        this._role = [] //relationship to class Role
    }
    
    //CRUD
    _create() {
        return db.execute(
            'INSERT INTO _group(group_id, group_name, group_description) VALUES(?,?,?)',
            [this._groupId,
            this._groupName,
            this._groupDescription]);
    }

    static _readByGroupId(groupId) {
        return db.execute(
            'SELECT * FROM _group WHERE group_id = ?',
            [groupId])
    }

    static _readRoleId(roleId){
        return db.execute(
            'SELECT * FROM _group WHERE group_id = ?',
            [roleId]    
        )
    }

    _update() {
        return db.execute(
            'UPDATE _group SET group_name = ?, group_description = ? WHERE group_id = ? ', 
            [this._groupName,
            this._groupDescription,
            this._groupId]
        );
    }

    _delete() {
        return db.execute(
            'DELETE FROM Group WHERE group_id = ?', 
            [this._groupId])
    }

    // getter and setter
    get getProperty() {
        return {
            groupId: this._groupId,
            groupName: this._groupName,
            groupDescription: this._groupDescription, 
            permission: this._permission,
            role: this._role
        };
    }

    set setProperty({  // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        groupId = this._groupId,
        groupName = this._groupName,
        groupDescription = this._groupDescription, 
    }) {
        // check datatype
        checkType(groupId, 'String');
        checkType(groupName, 'String');
        checkType(groupDescription, 'String');
        // assign to private variables
        this._groupId = groupId;
        this._groupName = groupName;
        this._groupDescription = groupDescription; 
    }

}