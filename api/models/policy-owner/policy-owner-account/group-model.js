module.exports = class Group {
    constructor(groupId,groupName, groupDescription){
        this._groupId = groupId;
        this._groupName = groupName;
        this._groupDescription = groupDescription; 
        this._permission = [];
        this._role = [];
    }
    
    _create() {
        return db.execute('INSERT INTO Group(group_id, group_name, group_description) VALUES(group_id =?,group_name = ?, group_description =?)',
        [this._groupId,
        this._groupName,
        this._groupDescription]);
    }

    static _read() {
        return db.execute('SELECT * FROM Group WHERE group_id =?',[this._groupId])
    }

    _update() {
        return db.execute(
            'UPDATE `Group` SET group_name = ?, group_description =? WHERE group_id =? ', 
            [this._groupName,
            this._groupDescription,
            this._groupId]
        );
    }

    _delete() {
        return db.execute('DELETE FROM Group WHERE group_id = ?', [this._groupId])
    }
}