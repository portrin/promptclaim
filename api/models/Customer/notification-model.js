const db = require('../../config/db');
const checkType = require('../../utils').checkType;

module.exports = class Notification {
    constructor({noti_id=null, message=null, timestamp=null} = {}) {
        // their own class atrribute ref. from class diagram
        this._notiId = noti_id,
        this._message = message,
        this._timestamp = timestamp,
        // their relationships to its neighbor ref. from class diagram
        this._customer = null
    }
    // DM layer CRUD
    _create() {
        return db.execute(
            'INSERT INTO notification (noti_id, message, timestamp, customer_id) VALUES (?, ?, ?, ?)',
            [this._notiId, this._message, this._timestamp, this._customer.getProperty.customerId]
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
            [this._message, this._timestamp, this._customer.getProperty.customerId, this._notiId]
        )
    }

    _delete() {
        db.execute(
            'DELETE FROM notification WHERE noti_id = ?'
            [this._notiId]
        )

    }

    //getter and setter
    get getProperty() {
        return {
            notiId: this._notiId,
            message: this._message,
            timestamp: this._timestamp,
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