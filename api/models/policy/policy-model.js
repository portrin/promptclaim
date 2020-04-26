const db = require("../../config/db");
const checkType = require("../../utils").checkType;

module.exports = class Policy {
  constructor({
    policy_id = null,
    policy_period = null,
    policy_description = null,
    date_created = null,
    policy_owner_id = null,
  } = {}) {
    // their own class atrribute ref. from class diagram
    this._policyId = policy_id;
    this._policyPeriod = policy_period;
    this._policyDescription = policy_description;
    this._dateCreated = date_created;
    this._policyOwnerId = policy_owner_id;
    // their relationships to its neighbor ref. from class diagram
    this._policyOwner = null; // relationship to PolicyOwner
    this._serviceCenterBranch = []; // relationship to ServiceCenterBranch
    this._purchasedProduct = []; // relationship to PurchasedProduct
  }

  // DM layer CRUD
  _create() {
    //get policyOwnerId
    return db.execute(
      "INSERT INTO policy(policy_id, policy_period, policy_description, date_created, policy_owner_id) VALUES (?, ?, ?, ?, ?)",
      [
        this._policyId,
        this._policyPeriod,
        this._policyDescription,
        this._dateCreated,
        this._policyOwnerId,
      ]
    );
  }

  static _readByCustomerId(customerId) {
    return db.execute(
      "SELECT P.policy_id, policy_period, policy_description, date_created, P.policy_owner_id, policy_start_date, policy_end_date, timestamp, P2.uuid FROM policy P LEFT JOIN product_has_policy P2 ON P.policy_id = P2.policy_id LEFT JOIN purchased_product P3 ON P2.uuid = P3.uuid WHERE customer_id = ?",
      [customerId]
    );
  }

  static _readByUuid(customerId, uuid) {
    return db.execute(
      "SELECT P.policy_id, policy_period, policy_description, date_created, P.policy_owner_id, policy_start_date, policy_end_date, timestamp FROM policy P LEFT JOIN product_has_policy P2 ON P.policy_id = P2.policy_id LEFT JOIN purchased_product P3 ON P2.uuid = P3.uuid WHERE customer_id = ? AND P3.uuid = ?",
      [customerId, uuid]
    );
  }

  static _readByRetailerId(retailerId) {
    return db.execute('SELECT P.policy_id, policy_period, policy_description, date_created, P.policy_owner_id, policy_start_date, policy_end_date, policy_timestamp, customer_id, P2.uuid, serial_no, P3.product_no, product_name FROM policy P LEFT JOIN retailer R ON P.policy_owner_id = R.policy_owner_id  LEFT JOIN product_has_policy P2 ON P.policy_id = P2.policy_id LEFT JOIN purchased_product P3 ON P2.uuid = P3.uuid LEFT JOIN product P4 ON P3.product_no = P4.product_no WHERE R.retailer_id = ?',
      [retailerId]
    );
  }

  static _readByPolicyId(retailerId, policyId) {
    return db.execute('SELECT policy_id, policy_period, policy_description, date_created, policy_owner_id, policy_start_date, policy_end_date, policy_timestamp, customer_id, uuid, serial_no, product_no, product_name FROM policy NATURAL JOIN product_has_policy NATURAL JOIN purchased_product NATURAL JOIN product WHERE retailer_id = ? AND policy_id = ?',
      [retailerId, policyId]
    );
  }

  _update() {
    return db.execute(
      "UPDATE policy SET policy_period = ?, policy_description = ?, date_created = ?, policy_owner_id = ? WHERE policy_id = ?",
      [
        this._policyPeriod,
        this._policyDescription,
        this._dateCreated,
        this._policyOwnerId,
        this._policyId,
      ]
    );
  }

  _delete() {
    return db.execute("DELETE FROM policy WHERE policy_id = ?", [
      this._policyId,
    ]);
  }

  // getter and setter
  get getProperty() {
    return {
      policyId: this._policyId,
      policyPeriod: this._policyPeriod,
      policyDescription: this._policyDescription,
      dateCreated: this._dateCreated,
      policyOwnerId: this._policyOwnerId,
      policyOwner: this._policyOwner,
      serviceCenterBranch: this._serviceCenterBranch,
      purchasedProduct: this._purchasedProduct,
    };
  }

  set setProperty({
    // set only its own attributes
    // destructuring object as parameter by using old values as a default.
    policyId = this._policyId,
    policyPeriod = this._policyPeriod,
    policyDescription = this._policyDescription,
    dateCreated = this._dateCreated,
  }) {
    // check datatype
    checkType(policyId, "String");
    checkType(policyPeriod, "String");
    checkType(policyDescription, "String");
    checkType(dateCreated, "String");
    // assign to private variables
    this._policyId = policyId;
    this._policyPeriod = policyPeriod;
    this._policyDescription = policyDescription;
    this._dateCreated = dateCreated;
  }
};
