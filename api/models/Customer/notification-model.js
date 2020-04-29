const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Notification {
    constructor({noti_id=null, message=null, timestamp=null, customer_id=null} = {}) {
        // their own class atrribute ref. from class diagram
        this._notiId = noti_id,
        this._message = message,
        this._timestamp = timestamp,
        this._customerId = customer_id,
        // their relationships to its neighbor ref. from class diagram
        this._customer = null
    }
    // DM layer CRUD
    _create() {
        return db.execute(
            'INSERT INTO notification (noti_id, message, timestamp, customer_id) VALUES (?, ?, ?, ?)',
            [this._notiId, this._message, this._timestamp, this._customerId]
        )
    }

    static _readByCustomerId(customerId) {
        return db.execute(
            'SELECT * FROM notification WHERE customer_id = ?',
            [customerId]
        )
    }

    _update() {
        db.execute(
            'UPDATE notification SET message = ?, timestamp = ?, customer_id = ? WHERE noti_id = ?',
            [this._message, this._timestamp, this._customerId, this._notiId]
        )
    }

    static _delete(customerId, notiId) {
        db.execute(
            'DELETE FROM notification WHERE customer_id = ? AND noti_id = ?'
            [customerId, notiId]
        );
    }

    //getter and setter
    get getProperty() {
        return {
            notiId: this._notiId,
            message: this._message,
            timestamp: this._timestamp,
            customerId: this._customerId,
            customer: this._customer
        }
    }

    set setProperty({ // set only its own attributes
        // destructuring object as parameter by using old values as a default.
        notiId = this._notiId,
        message = this._message,
        timestamp = this._timestamp
    }) {
        checkType(notiId, 'String');
        checkType(message, 'String');
        checkType(timestamp, 'String');
        this._notiId = notiId;
        this._message = message;
        this._timestamp = timestamp;
    }

}