const rootAccount = require('./root-account-model')

module.exports = class Role {
    constructor(username, password, roleName, roleDescription) {
        this._username = username;
        this._password = password;
        this._roleName = roleName;
        this._roleDescription = roleDescription;
        this._rootAccount;
        this._permission =[];
        this._group = [];
    }
    _create() {
        const rootId = rootAccount.getRootId()
        return db.execute('INSERT INTO Role (root_id, username, password, role_name, role_description) VALUES(root_id = ?, username =?, password =?, role_name = ?, role_description =?)',
        [rootId,
        this._username,
        this._password,
        this._roleName,
        this._roleDescription
        ])
    }

    static _read() {
        const rootId = rootAccount.getRootId()
        return db.execute('SELECT * FROM Role WHERE root_id =? AND username =?',[rootId, this._username])
    }

    _update() {
        const rootId = rootAccount.getRootId()
        return db.execute(
            'UPDATE `Role` SET username = ?, password = ?, role_name = ? , role_description = ? WHERE root_id =? AND username = ?', 
            [this._password,
            this._roleName,
            this._roleDescription,
            rootId,
            this._username]
        );
    }

    _delete() {
        const rootId = rootAccount.getRootId()
        return db.execute('DELETE FROM Role WHERE root_id = ? AND username =?', [rootId, this._username])
    }
}