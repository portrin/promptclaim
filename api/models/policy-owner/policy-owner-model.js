module.exports = class PolicyOwner {
    constructor(policyOwnerId, ownerType) {
        // their own class atrribute ref. from class diagram
        this._policyOwnerId = policyOwnerId;
        this._ownerType = ownerType;    
        // their relationships to its neighbor ref. from class diagram
        this._policy = [];
    }

    // DM layer CRUD
    _create () {
        return db.execute('INSERT INTO policy_owner(policy_owner_id, owner_type) VALUES (?, ?)',
            [this._policyOwnerId, this._ownerType]
        );
    }

    static _read () {
        return db.execute('SELECT * FROM policy_owner');
    }

    _update () {
        return db.execute('UPDATE policy_owner SET owner_type = ? WHERE policy_owner_id = ?',
            [this._policyOwnerId]
        );
    }

    _delete () {
        return db.execute('DELETE FROM policy_owner WHERE policy_owner_id = ?', [this._policyOwnerId]);
    }    
}


