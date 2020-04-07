module.exports = class Permission {
    constructor(perId, perName, perDescription, perModule){
        this._perId = perId;
        this._perName = perName;
        this._perDescription = perDescription; 
        this._perModule = perModule;
        this._role = [];
        this._group = []
    }
    
    _create () {
        return db.execute('INSERT INTO Permission(per_id, per_name, per_description, per_module) VALUES(per_id =? , per_name =?, per_description =?, per_module=?)',
        [this._perId,
        this._perName,
        this._perDescription,
        this._perModule
        ])
    }

    static _read () {
        return db.execute('SELECT * FROM Permission WHERE per_id =?',[this._perId])
    }

    _update () {
        return db.execute(
            'UPDATE `Permission` SET per_name =?, per_description =?, per_module=? WHERE per_id =?', 
            [this._perName,
            this._perDescription,
            this._perModule,
            this._perId
            ]);
    }

    _delete () {
        return db.execute('DELETE FROM Permission WHERE per_id = ?', [this._perId])
    }
}