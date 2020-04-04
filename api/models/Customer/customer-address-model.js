const db = require('../../config/db');

module.exports = class CustomerAddress {
    constructor(address_id, house_no, street, sub_district, district, province, zipcode){
        this.address_id = address_id;
        this.house_no = house_no;
        this.street = street; 
        this.sub_district = sub_district; 
        this.district = district;
        this.province = province; 
        this.zipcode = zipcode;
    }
}  