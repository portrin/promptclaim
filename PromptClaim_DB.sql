CREATE DATABASE promptclaim;

CREATE TABLE Customer_account (
	account_id VARCHAR(6) NOT NULL,
    username VARCHAR(80) NOT NULL,
    password VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL,
    PRIMARY KEY(account_id)
);

CREATE TABLE Customer (
	customer_id VARCHAR(6) NOT NULL,
    firstname VARCHAR(80) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    phone_no VARCHAR(12) NOT NULL,
    birth_no DATE NOT NULL,
    gender CHAR NOT NULL,
    account_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(customer_id),
    FOREIGN KEY(account_id) REFERENCES Customer_account(account_id)
);


CREATE TABLE Customer_address (
	customer_id VARCHAR(6) NOT NULL,
    address_id VARCHAR(6) NOT NULL,
    house_no VARCHAR(80) NOT NULL,
    street VARCHAR(80),
    sub_district VARCHAR(80) NOT NULL,
    district VARCHAR(80) NOT NULL,
    province VARCHAR(80) NOT NULL,
    zipcode VARCHAR(5) NOT NULL,
    PRIMARY KEY(customer_id, address_id),
    FOREIGN KEY(customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE Product_category (
	category_id VARCHAR(6) NOT NULL,
    category_name VARCHAR(80),
    PRIMARY KEY(category_id)
);

CREATE TABLE Root_account (
	root_id VARCHAR(6) NOT NULL,
    username VARCHAR(80) NOT NULL,
    password VARCHAR(80) NOT NULL,
    type CHAR NOT NULL,
    PRIMARY KEY(root_id)
);

CREATE TABLE Retailer (
	retailer_id VARCHAR(6) NOT NULL,
    contact vARCHAR(12) NOT NULL,
    name VARCHAR(80) NOT NULL,
    hq_address VARCHAR(256) NOT NULL,
    retailer_description VARCHAR(256),
    root_id VARCHAR(6) NOT NULL,
    policy_owner_id VARCHAR(6),
    PRIMARY KEY(retailer_id),
    FOREIGN KEY(root_id) REFERENCES Root_account(root_id)
);

CREATE TABLE Retailer_barnch (
	retailer_id VARCHAR(6) NOT NULL,
    branch_id VARCHAR(6) NOT NULL,
    branch_name VARCHAR(80) NOT NULL,
    contact VARCHAR(12) NOT NULL,
    address VARCHAR(80) NOT NULL,
    PRIMARY KEY(retailer_id, branch_id),
    FOREIGN KEY(retailer_id) REFERENCES Retailer(retailer_id)
);

CREATE TABLE Role (
	root_id VARCHAR(6) NOT NULL,
    username VARCHAR(80) NOT NULL,
    role_name VARCHAR(80) NOT NULL,
    password VARCHAR(80) NOT NULL,
    role_description VARCHAR(256),
    PRIMARY KEY(root_id, username),
    FOREIGN KEY(root_id) REFERENCES Root_account(root_id)
);

CREATE TABLE _Group (
	group_id VARCHAR(6) NOT NULL,
    group_name VARCHAR(80) NOT NULL,
    group_description VARCHAR(256),
    PRIMARY KEY(group_id)
);

CREATE TABLE Permission (
	per_id VARCHAR(6) NOT NULL,
	per_description VARCHAR(256),
	per_name VARCHAR(80) NOT NULL,
	per_module VARCHAR(256) NOT NULL,
	PRIMARY KEY(per_id)
);

CREATE TABLE Group_has_permission (
	group_id VARCHAR(6) NOT NULL,
    per_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(group_id, per_id),
    FOREIGN KEY(group_id) REFERENCES _Group(group_id),
    FOREIGN KEY(per_id) REFERENCES Permission(per_id)
);

CREATE TABLE Role_has_permission (
	root_id VARCHAR(6) NOT NULL,
    username VARCHAR(80) NOT NULL,
    per_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(root_id, username, per_id),
    FOREIGN KEY(root_id, username) REFERENCES Role(root_id, username),
    FOREIGN KEY(per_id) REFERENCES Permission(per_id)
);

CREATE TABLE Role_in_group (
	group_id VARCHAR(6) NOT NULL,
    username VARCHAR(80) NOT NULL,
    root_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(group_id, username, root_id),
    FOREIGN KEY(root_id, username) REFERENCES Role(root_id, username),
    FOREIGN KEY(group_id) REFERENCES _Group(group_id)
);

CREATE TABLE Policy_owner (
	policy_owner_id VARCHAR(6) NOT NULL,
    owner_type CHAR NOT NULL,
    PRIMARY KEY(policy_owner_id)
);

CREATE TABLE Supplier (
	supplier_id VARCHAR(6) NOT NULL,
    supplier_description VARCHAR(256),
    name VARCHAR(80) NOT NULL,
    contact VARCHAR(10) NOT NULL,
    address VARCHAR(256) NOT NULL,
    root_id VARCHAR(6) NOT NULL,
    policy_owner_id VARCHAR(6),
    PRIMARY KEY(supplier_id),
    FOREIGN KEY(root_id) REFERENCES Root_account(root_id),
    FOREIGN KEY(policy_owner_id) REFERENCES Policy_owner(policy_owner_id)
);

CREATE TABLE Product (
	product_no VARCHAR(80) NOT NULL,
    product_model VARCHAR(80) NOT NULL,
    product_name VARCHAR(80) NOT NULL,
    product_description VARCHAR(256),
    supplier_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(product_no),
    FOREIGN KEY(supplier_id) REFERENCES Supplier(supplier_id)
);

CREATE TABLE Purchased_product (
	serial_no VARCHAR(80) NOT NULL,
    product_no VARCHAR(80) NOT NULL,
    account_id VARCHAR(6) NOT NULL,
    price DOUBLE NOT NULL,
    invoice_id VARCHAR(80),
    timestamp TIMESTAMP,
    branch_id VARCHAR(6),
    retailer_id VARCHAR(6),
    receipt_photo VARCHAR(80),
	is_validate BOOLEAN NOT NULL,
    product_photo VARCHAR(80),
    claim_qty INT NOT NULL,
    PRIMARY KEY(serial_no, product_no),
    FOREIGN KEY(product_no) REFERENCES Product(product_no),
    FOREIGN KEY(account_id) REFERENCES Customer_account(account_id)
);

CREATE TABLE Policy (
	policy_id VARCHAR(6) NOT NULL,
    policy_period VARCHAR(80) NOT NULL,
    policy_description VARCHAR(256),
    policy_picture VARCHAR(256),
    data_created DATE NOT NULL,
    policy_owner_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(policy_id),
    FOREIGN KEY(policy_owner_id) REFERENCES Policy_owner(policy_owner_id)
);

CREATE TABLE Thrid_party (
	third_party_id VARCHAR(6) NOT NULL,
    address VARCHAR(256) NOT NULL,
    name VARCHAR(80) NOT NULL,
    contact VARCHAR(10) NOT NULL,
    third_party_description VARCHAR(256),
    root_id VARCHAR(6),
    policy_owner_id VARCHAR(6),
    PRIMARY KEY(third_party_id),
    FOREIGN KEY(root_id) REFERENCES Root_account(root_id),
    FOREIGN KEY(policy_owner_id) REFERENCES Policy_owner(policy_owner_id)
);

CREATE TABLE Service_center (
	service_center_id VARCHAR(6) NOT NULL,
    name VARCHAR(80) NOT NULL,
    hq_address VARCHAR(256) NOT NULL,
    service_center_description VARCHAR(256),
    PRIMARY KEY(service_center_id)
);

CREATE TABLE Service_center_branch (
	branch_id VARCHAR(6) NOT NULL,
    service_center_id VARCHAR(6) NOT NULL,
    branch_name VARCHAR(80) NOT NULL,
    contact VARCHAR(10) NOT NULL,
    address VARCHAR(256) NOT NULL,
    PRIMARY KEY(branch_id, service_center_id),
    FOREIGN KEY(service_center_id) REFERENCES Service_center(service_center_id)
);

CREATE TABLE Product_classify_as (
	category_id VARCHAR(6) NOT NULL,
    product_no VARCHAR(6) NOT NULL,
    PRIMARY KEY(category_id, product_no),
    FOREIGN KEY(category_id) REFERENCES Product_category(category_id),
    FOREIGN KEY(product_no) REFERENCES Product(product_no)
);

CREATE TABLE Claim_log (
	claim_id VARCHAR(6) NOT NULL,
    status VARCHAR(256) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    serial_no VARCHAR(6) NOT NULL,
    product_no VARCHAR(80) NOT NULL,
    service_center_id VARCHAR(6) NOT NULL,
    branch_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(claim_id),
    FOREIGN KEY(serial_no, product_no) REFERENCES Purchased_product(serial_no, product_no),
    FOREIGN KEY(service_center_id, branch_id) REFERENCES Service_center_branch(service_center_id, branch_id)
);

CREATE TABLE Policy_available_at (
	policy_id VARCHAR(6) NOT NULL,
    branch_id VARCHAR(6) NOT NULL,
    service_center_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(policy_id, branch_id, service_center_id),
    FOREIGN KEY(policy_id) REFERENCES Policy(policy_id),
    FOREIGN KEY(branch_id, service_center_id) REFERENCES Service_center_branch(branch_id, service_center_id)
);


CREATE TABLE Product_has_policy (
	policy_id VARCHAR(6) NOT NULL,
    serial_no VARCHAR(6) NOT NULL,
    product_no VARCHAR(80) NOT NULL,
    policy_start_date DATE NOT NULL,
    policy_end_date DATE NOT NULL,
    PRIMARY KEY(policy_id, serial_no, product_no),
    FOREIGN KEY(policy_id) REFERENCES Policy(policy_id),
    FOREIGN KEY(serial_no) REFERENCES Purchased_product(serial_no),
    FOREIGN KEY(product_no) REFERENCES Product(product_no)
);











    
	



    
    
    