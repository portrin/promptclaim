/*CREATE DATABASE pclaim;*/

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

CREATE TABLE Policy_owner (
    policy_owner_id VARCHAR(6) NOT NULL,
    owner_type VARCHAR(12) NOT NULL,
    PRIMARY KEY (policy_owner_id)
);

CREATE TABLE Retailer (
	retailer_id VARCHAR(6) NOT NULL,
    contact vARCHAR(12) NOT NULL,
    name VARCHAR(80) NOT NULL,
    hq_address VARCHAR(256) NOT NULL,
    retailer_description VARCHAR(256),
    root_id VARCHAR(6),
    policy_owner_id VARCHAR(6),
    PRIMARY KEY(retailer_id),
    FOREIGN KEY(root_id) REFERENCES Root_account(root_id),
    FOREIGN KEY(policy_owner_id) REFERENCES Policy_owner(policy_owner_id)

);

CREATE TABLE Retailer_branch (
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

CREATE TABLE Supplier (
	supplier_id VARCHAR(6) NOT NULL,
    supplier_description VARCHAR(256),
    name VARCHAR(80) NOT NULL,
    contact VARCHAR(10) NOT NULL,
    address VARCHAR(256) NOT NULL,
    root_id VARCHAR(6),
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
	uuid INT AUTO_INCREMENT NOT NULL,
	serial_no VARCHAR(80) NOT NULL,
    product_no VARCHAR(80) NOT NULL,
    customer_id VARCHAR(6) NOT NULL,
    product_nickname VARCHAR(80),
    price DOUBLE NOT NULL,
    invoice_id VARCHAR(80),
    timestamp TIMESTAMP,
    branch_id VARCHAR(6),
    retailer_id VARCHAR(6),
    receipt_photo VARCHAR(80),
	is_validate BOOLEAN NOT NULL,
    product_photo VARCHAR(80),
    claim_qty INT NOT NULL,
    warranty_photo VARCHAR(256),
    PRIMARY KEY(uuid),
    FOREIGN KEY(product_no) REFERENCES Product(product_no),
    FOREIGN KEY(customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE Policy (
	policy_id VARCHAR(6) NOT NULL,
    policy_period VARCHAR(80) NOT NULL,
    policy_description VARCHAR(256),
    policy_owner_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(policy_id)
);

CREATE TABLE Third_party (
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
    uuid INT NOT NULL,
    service_center_id VARCHAR(6),
    branch_id VARCHAR(6),
    PRIMARY KEY(claim_id),
    FOREIGN KEY(uuid) REFERENCES Purchased_product(uuid),
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
    uuid INT NOT NULL,
    policy_start_date DATE,
    policy_end_date DATE,
    timestamp TIMESTAMP NOT NULL,
    PRIMARY KEY(policy_id, uuid),
    FOREIGN KEY(policy_id) REFERENCES Policy(policy_id),
    FOREIGN KEY(uuid) REFERENCES Purchased_product(uuid)
);

CREATE TABLE Pp_classify_as (
	uuid INT NOT NULL,
    category_id VARCHAR(80) NOT NULL,
    PRIMARY KEY(uuid)
);


INSERT INTO Customer_account(account_id, username, password, email)
VALUES ('1','chchadaa','chada1','chada@gmail.com'),
('2','somd99','som2','somroutine@gmail.com'),
('3','praaewpun','praew3','merrypraeww@gmail.com'),
('4','por_trin','por4','melonqq@gmail.com'),
('5','ploinrch','ploi5','ploiniracha@gmail.com');

INSERT INTO Customer(customer_id, firstname, lastname, phone_no, birth_no, gender, account_id)
VALUES ('1','Apichada','Achanan','0822207334','1999-4-21','F','1'),
('2','Som','Somlastname','0895511663','1999-1-20','M','2'),
('3','Praewpun','Praewlastname','0972279898','1998-11-24','F','3'),
('4','Trin','Porlastname','0837779292','1998-5-4','M','4'),
('5','Niracha','Ploilastname','0877150888', '1998-9-14','F','5');

INSERT INTO Customer_address(customer_id, address_id, house_no, street, sub_district, district, province, zipcode)
VALUES ('1','1','23/4','Sathorn','Silom','Sathorn','Bangkok','10120'),
('2','2','144/2','-','Ban Nuea','Khwae Yai','Kanchanaburi', '71000'),
('3','3','599/97','Nonsi Road','Chongnonsi','Yannawa','Bangkok', '10120'),
('3','4','131/9-10','Wat Kak','Silom','Sathorn','Bangkok', '10120'),
('4','5','132/33','Por road','Luk 4','Lat yai','Nonthaburi','20500'),
('4','6','100/21','Trin Road','Vertical','Ari','Bangkok','12100'),
('5','7','5/123','Q-house road', 'Krung thonburi','Fung thon','Bangkok','10300');

INSERT INTO Product_category(category_id, category_name)
VALUES ('1','Wall & Floor'),
('2','Bathroom'),
('3','Kitchen'),
('4','Furniture Lifestyle'),
('5','Lighting'),
('6','Home Appliances'),
('7','Doors & Windows'),
('8','Paint & Equipment'),
('9','Tools & Hardware'),
('10','Garden - Plumbing - DIY'),
('11','Promotion');

INSERT INTO Root_account(root_id, username, password, type)
VALUES ('000001','IKEA', 'Ikeapassword','S'),
('000002','Boonthavorn', 'BTVpassword','R'),
('000003','Show Huay', 'showhuaypwd','T'),
('000004','ZARA HOME', 'ZARApwd','R');

INSERT INTO Policy_owner(policy_owner_id, owner_type) 
VALUES ('IKEA01', 'R'),
('BTV002', 'R'),
('ZARA04', 'R'),
('SUP01', 'S'),
('SUP02', 'S'),
('SUP03', 'S'),
('SUP04', 'S'),
('SH01', 'T');


INSERT INTO Retailer(retailer_id, contact, name, hq_address, retailer_description, root_id, policy_owner_id)
VALUES ('000001','0972279898', 'IKEA','Bangna','Furnitures imported from Sweden','000001','IKEA01'),
('000002','0972279898', 'Boothavorn','Suhhumvit53','Mostly about floor','000002','BTV002'),
('000003','0852289888', 'Zara home','Paragon','Furnitures with clothing brands','000004','ZARA04');

INSERT INTO Retailer_branch(retailer_id, branch_id, branch_name, contact, address)
VALUES ('000001', '00001A','IKEA Nonthaburi', '0981234567','56/56 giodano, whatever road, Nonthaburi 10120'),
('000001', '00001B','IKEA Bangna', '0123454567','123, bangna road, Bangkok 10520'),
('000001', '00001C','IKEA Lat Prao', '0977234567','11/98 Lat Prao road, Bangkok 10500'),
('000002', '00002A','Boothavorn Nonthaburi', '0881234567','131/11, whatever road, Nonthaburi 13100'),
('000002', '00002B','Boothavorn Sukhumvit', '0811234567','123/44 Sukhumvit 77, Bangkok 10120'),
('000002', '00002C','Boothavorn Lat yao', '0981234598','Lat Yao, Bangkok 10120'),
('000003', '00003A','Zara Paragon', '0981234556','44 Rama1 road, Bangkok 10120');

INSERT INTO Role (root_id, username, role_name, password, role_description)
VALUES ('000001', 'klodkup340', 'role1', 'password1', 'roledescription1'),
('000002', 'praewkup340', 'role2', 'password2', 'roledescription2'),
('000003', 'teekup340', 'role3', 'password3', 'roledescription3'),
('000004', 'porkup340', 'role4', 'password4', 'roledescription4');

INSERT INTO _Group (group_id, group_name, group_description)
VALUES ('000001', 'group1', 'group1description'),
('000002', 'group2', 'group2description'),
('000003', 'group3', 'group3description'),
('000004', 'group4', 'group4description');

INSERT INTO Permission (per_id, per_description, per_name, per_module)
VALUES ('000001', 'permission1', 'permission1name', 'module1'),
('000002', 'permission2', 'permission2name', 'module2'),
('000003', 'permission3', 'permission3name', 'module3'),
('000004', 'permission4', 'permission4name', 'module4');

INSERT INTO Group_has_permission (group_id, per_id)
VALUES ('000001', '000001'),
('000002', '000002'),
('000003', '000003'),
('000004', '000004');

INSERT INTO Role_has_permission (root_id, username, per_id)
VALUES ('000001', 'klodkup340', '000001'),
('000002', 'praewkup340', '000002'),
('000003', 'teekup340', '000003'),
('000004', 'porkup340', '000004');

INSERT INTO Role_in_group (group_id, username, root_id)
VALUES ('000001', 'klodkup340', '000001'),
('000002', 'praewkup340', '000002'),
('000003', 'teekup340', '000003'),
('000004', 'porkup340', '000004');

INSERT INTO Supplier (supplier_id, supplier_description, name, contact, address, root_id, policy_owner_id)
VALUES ('000001', 'supplier1', 'supplierName1', '0945593841', '5/117', '000001', 'SUP01'),
('000002', 'supplier2', 'supplierName2', '0945593842', '5/118', '000002', 'SUP02'),
('000003', 'supplier3', 'supplierName3', '0945593843', '5/119', '000003', 'SUP03'),
('000004', 'supplier4', 'supplierName4', '0945593844', '5/120', '000004', 'SUP04');

INSERT INTO Product (product_no, product_model, product_name, product_description, supplier_id)
VALUES ('AAAAA1', 'BBBBB1', 'chair', 'A very smart chair', '000001'),
('AAAAA2', 'BBBBB2', 'bed', 'A very smart bed', '000001'),
('AAAAA3', 'BBBBB3', 'table', 'A very smart table', '000002'),
('AAAAA4', 'BBBBB4', 'sofa', 'A very smart sofa', '000002');

INSERT INTO Purchased_product (serial_no, product_no, customer_id, product_nickname, price, invoice_id, timestamp, branch_id, retailer_id, receipt_photo, is_validate, product_photo, claim_qty, warranty_photo)
VALUES ('SSSSS1', 'AAAAA1', '1', 'my chair', '2500', '000001', '2020-03-03', '00001A', '000001', 'photo1', True, 'photo1', '1', 'warrantyphoto1'),
('SSSSS2', 'AAAAA2', '2', 'my table', '3000', '000002', '2020-03-03', '00001A', '000001', 'photo2', True, 'photo2', '2', 'warrantyphoto2'),
('SSSSS3', 'AAAAA3', '3', 'my bed', '4000', '000003', '2020-03-03', '00002A', '000002', 'photo3', True, 'photo3', '3', 'warrantyphoto3'),
('SSSSS4', 'AAAAA4', '4', 'my sofa', '2500', '000004', '2020-03-03', '00002A', '000002', 'photo3', True, 'photo3', '1', 'warrantyphoto4');

INSERT INTO policy(policy_id, policy_period, policy_description, policy_owner_id) 
VALUES ('001', '3 years', 'Awesome policy', '000001'),
('002', '1 year', 'Mediocre policy', '000002'),
('003', '0.5 year', 'Awful policy', '000003');

INSERT INTO product_classify_as(category_id, product_no) 
VALUES ('4', 'AAAAA1'),
('4', 'AAAAA2'),
('3', 'AAAAA3'),
('4', 'AAAAA4');

INSERT INTO product_has_policy(policy_id, uuid , policy_start_date, policy_end_date, timestamp) 
VALUES ('001', '1', DATE'2020-03-30', DATE'2020-12-15', TIMESTAMP'2008-01-01 00:00:01'),
('002', '2', DATE'2020-04-02', DATE'2020-12-18', TIMESTAMP'2008-01-01 00:00:02'),
('003', '3', DATE'2020-03-31', DATE'2020-12-16', TIMESTAMP'2008-01-01 00:00:03'),
('001', '4', DATE'2020-04-01', DATE'2020-12-17', TIMESTAMP'2008-01-01 00:00:04');

INSERT INTO service_center(service_center_id, name, hq_address, service_center_description)
VALUES ('1', 'IKEA service', 'Bangna', 'This place services IKEA'),
('2', 'Boonthavorn service', 'Sukhumvit53', 'This place services Boonthavorn'),
('3', 'ZARA home service', 'Paragon', 'This place services ZARA home');

INSERT INTO service_center_branch(branch_id, service_center_id, branch_name, contact, address)
VALUES ('1', '1', 'Bangna', '020000000', 'Bangna, Bangkok, 12345'),
('1', '2', 'Ratchada', '021234567', 'Ratchada, Bangkok, 12345'),
('1', '3', 'Paragon', '027777777', 'Paragon, Bangkok, 12345'),
('2', '1', 'Moon', '029999999', 'Dark side of the Moon'),
('2', '2', 'Puttamonthol', '029876543', 'Puttamonthol, Bangkok, 12345'),
('2', '3', 'Central World', '028888888', 'Central World, Bangkok, 12345');

INSERT INTO policy_available_at(policy_id, branch_id, service_center_id) 
VALUES ('001', '1', '1'),
('002', '2', '1'),
('003', '1', '2');

INSERT INTO third_party(third_party_id, address, name, contact, third_party_description, root_id, policy_owner_id)
VALUES ('000001', 'MBK', 'ShowHuay', '0860623462', 'Shady third party', '000003', 'SH01');

INSERT INTO Claim_log (claim_id, status, timestamp, uuid, service_center_id, branch_id)
VALUES ('000001', 'status1', '2020-03-03', '1', '1', '1'),
('000002', 'status2', '2020-03-04', '2', '2', '2'),
('000003', 'status3', '2020-03-05', '3', '3', '2'),
('000004', 'status4', '2020-03-06','4', '2', '1');

CREATE TABLE Notification (
	noti_id VARCHAR(6) NOT NULL,
	message VARCHAR(256) NOT NULL,
	customer_id VARCHAR(6) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    PRIMARY KEY (noti_id),
	FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)); 
    
INSERT INTO notification(noti_id, message, customer_id, timestamp) 
VALUES ('01', 'The product has been claimed', '1', '2020-01-18 11:00:01'),
('02', 'Expiration date tomorrow', '2', '2020-02-18 11:00:01'),
('03', 'Promotion for curry', '3', '2020-03-18 11:00:01');

INSERT INTO Pp_classify_as(uuid, category_id)
VALUES ('1','1'),
('2','2'),
('3','3'),
('4','4');






