const checkType = require('../../utils').checkType;

module.exports = class PolicyOwner {
    constructor(policyOwnerId) {
        // their own class atrribute ref. from class diagram
        this._policyOwnerId = policyOwnerId;
        // their relationships to its neighbor ref. from class diagram
        this._policy = [];
    }

    // Policy
    addPolicy(policy) {
        checkType(policy, 'Policy');
        this._policy.push(policy);
        return;
    }
}