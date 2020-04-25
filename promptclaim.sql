/*CREATE DATABASE promptclaim;*/

CREATE TABLE customer_account (
	account_id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(80),
    password VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL,
    PRIMARY KEY(account_id) 
);

CREATE TABLE customer (
	customer_id INT NOT NULL,
    firstname VARCHAR(80),
    lastname VARCHAR(80),
    phone_no VARCHAR(12),
    birth_date DATE,
    gender CHAR, 
    account_id INT NOT NULL,
    PRIMARY KEY(customer_id),
    FOREIGN KEY(account_id) REFERENCES customer_account(account_id) ON DELETE CASCADE
);

CREATE TABLE customer_address (
	customer_id INT NOT NULL,
    address_id VARCHAR(6) NOT NULL,
    house_no VARCHAR(80),
    street VARCHAR(80),
    sub_district VARCHAR(80),
    district VARCHAR(80),
    province VARCHAR(80),
    zipcode VARCHAR(5),
    PRIMARY KEY(customer_id, address_id),
    FOREIGN KEY(customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

CREATE TABLE product_category (
	category_id INT AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(80),
    PRIMARY KEY(category_id)
);

CREATE TABLE root_account (
	root_id VARCHAR(6) NOT NULL,
    username VARCHAR(80) NOT NULL,
    password VARCHAR(80) NOT NULL,
    type CHAR NOT NULL,
    PRIMARY KEY(root_id)
);

CREATE TABLE policy_owner (
    policy_owner_id VARCHAR(6) NOT NULL,
    owner_type VARCHAR(12) NOT NULL,
    PRIMARY KEY (policy_owner_id)
);

CREATE TABLE retailer (
	retailer_id VARCHAR(6) NOT NULL,
    retailer_contact VARCHAR(12),
    retailer_name VARCHAR(80),
    retailer_hq_address VARCHAR(256),
    retailer_description VARCHAR(256),
    root_id VARCHAR(6),
    policy_owner_id VARCHAR(6),
    PRIMARY KEY(retailer_id),
    FOREIGN KEY(root_id) REFERENCES root_account(root_id) ON DELETE CASCADE,
    FOREIGN KEY(policy_owner_id) REFERENCES policy_owner(policy_owner_id) ON DELETE CASCADE

);

CREATE TABLE retailer_branch (
	retailer_id VARCHAR(6) NOT NULL,
    retailer_branch_id VARCHAR(6) NOT NULL,
    retailer_branch_name VARCHAR(80),
    retailer_branch_contact VARCHAR(12),
    retailer_branch_address VARCHAR(80),
    PRIMARY KEY(retailer_id, retailer_branch_id),
    FOREIGN KEY(retailer_id) REFERENCES retailer(retailer_id) ON DELETE CASCADE
);

CREATE TABLE role (
	root_id VARCHAR(6) NOT NULL,
    username VARCHAR(80) NOT NULL,
    role_name VARCHAR(80) NOT NULL,
    password VARCHAR(80) NOT NULL,
    role_description VARCHAR(256),
    PRIMARY KEY(root_id, username),
    FOREIGN KEY(root_id) REFERENCES root_account(root_id) ON DELETE CASCADE
);

CREATE TABLE _group (
	group_id VARCHAR(6) NOT NULL,
    group_name VARCHAR(80) NOT NULL,
    group_description VARCHAR(256),
    PRIMARY KEY(group_id)
);

CREATE TABLE permission (
	per_id VARCHAR(6) NOT NULL,
	per_description VARCHAR(256),
	per_name VARCHAR(80) NOT NULL,
	per_module VARCHAR(256) NOT NULL,
	PRIMARY KEY(per_id)
);

CREATE TABLE group_has_permission (
	group_id VARCHAR(6) NOT NULL,
    per_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(group_id, per_id),
    FOREIGN KEY(group_id) REFERENCES _group(group_id) ON DELETE CASCADE,
    FOREIGN KEY(per_id) REFERENCES permission(per_id) ON DELETE CASCADE
);

CREATE TABLE role_has_permission (
	root_id VARCHAR(6) NOT NULL,
    username VARCHAR(80) NOT NULL,
    per_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(root_id, username, per_id),
    FOREIGN KEY(root_id, username) REFERENCES role(root_id, username) ON DELETE CASCADE,
    FOREIGN KEY(per_id) REFERENCES permission(per_id) ON DELETE CASCADE
);

CREATE TABLE role_in_group (
	group_id VARCHAR(6) NOT NULL,
    username VARCHAR(80) NOT NULL,
    root_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(group_id, username, root_id),
    FOREIGN KEY(root_id, username) REFERENCES role(root_id, username) ON DELETE CASCADE,
    FOREIGN KEY(group_id) REFERENCES _group(group_id) ON DELETE CASCADE
);

CREATE TABLE supplier (
	supplier_id VARCHAR(6) NOT NULL,
    supplier_description VARCHAR(256),
    supplier_name VARCHAR(80),
    supplier_contact VARCHAR(10),
    supplier_address VARCHAR(256),
    root_id VARCHAR(6),
    policy_owner_id VARCHAR(6),
    PRIMARY KEY(supplier_id),
    FOREIGN KEY(root_id) REFERENCES root_account(root_id) ON DELETE CASCADE,
    FOREIGN KEY(policy_owner_id) REFERENCES policy_owner(policy_owner_id) ON DELETE CASCADE
);

CREATE TABLE product (
	product_no VARCHAR(80) NOT NULL,
    product_model VARCHAR(80),
    product_name VARCHAR(80),
    product_description VARCHAR(256),
    supplier_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(product_no),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id) ON DELETE CASCADE
);

CREATE TABLE purchased_product (
	uuid INT AUTO_INCREMENT NOT NULL,
	serial_no VARCHAR(80),
    product_no VARCHAR(80),
    customer_id INT NOT NULL,
    product_nickname VARCHAR(80),
    price DOUBLE,
    invoice_id VARCHAR(80),
    create_timestamp TIMESTAMP,
    retailer_branch_id VARCHAR(6),
    retailer_id VARCHAR(6),
    invoice_photo VARCHAR(1000),
	is_validate BOOLEAN,
    product_photo VARCHAR(1000),
    claim_qty INT,
    warranty_photo VARCHAR(1000),
    PRIMARY KEY(uuid),
    FOREIGN KEY(product_no) REFERENCES product(product_no) ON DELETE CASCADE,
    FOREIGN KEY(customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY(retailer_id, retailer_branch_id) REFERENCES retailer_branch(retailer_id, retailer_branch_id) ON DELETE CASCADE
);

CREATE TABLE policy (
	policy_id VARCHAR(6) NOT NULL,
    policy_period VARCHAR(80),
    policy_description VARCHAR(256),
    date_created DATE,
    policy_owner_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(policy_id),
    FOREIGN KEY(policy_owner_id) REFERENCES policy_owner(policy_owner_id) ON DELETE CASCADE
);

CREATE TABLE third_party (
	third_party_id VARCHAR(6) NOT NULL,
    third_party_address VARCHAR(256),
    third_party_name VARCHAR(80),
    third_party_contact VARCHAR(10),
    third_party_description VARCHAR(256),
    root_id VARCHAR(6),
    policy_owner_id VARCHAR(6),
    PRIMARY KEY(third_party_id),
    FOREIGN KEY(root_id) REFERENCES root_account(root_id) ON DELETE CASCADE,
    FOREIGN KEY(policy_owner_id) REFERENCES policy_owner(policy_owner_id) ON DELETE CASCADE
);

CREATE TABLE service_center (
	service_center_id VARCHAR(6) NOT NULL,
    service_center_name VARCHAR(80),
    service_center_hq_address VARCHAR(256),
    service_center_description VARCHAR(256),
    PRIMARY KEY(service_center_id)
);

CREATE TABLE service_center_branch (
	service_center_branch_id VARCHAR(6) NOT NULL,
    service_center_id VARCHAR(6) NOT NULL,
    service_center_branch_name VARCHAR(80),
    service_center_branch_contact VARCHAR(10),
    service_center_branch_address VARCHAR(256),
    PRIMARY KEY(service_center_branch_id, service_center_id),
    FOREIGN KEY(service_center_id) REFERENCES service_center(service_center_id) ON DELETE CASCADE
);

CREATE TABLE product_classify_as (
	category_id INT NOT NULL,
    product_no VARCHAR(6) NOT NULL,
    PRIMARY KEY(category_id, product_no),
    FOREIGN KEY(category_id) REFERENCES product_category(category_id) ON DELETE CASCADE,
    FOREIGN KEY(product_no) REFERENCES product(product_no) ON DELETE CASCADE
);

CREATE TABLE claim_log (
	claim_id INT AUTO_INCREMENT NOT NULL,
    status VARCHAR(256),
    timestamp TIMESTAMP,
    uuid INT NOT NULL,
    service_center_id VARCHAR(6),
    service_center_branch_id VARCHAR(6),
    PRIMARY KEY(claim_id),
    FOREIGN KEY(uuid) REFERENCES purchased_product(uuid) ON DELETE CASCADE,
    FOREIGN KEY(service_center_id, service_center_branch_id) REFERENCES service_center_branch(service_center_id, service_center_branch_id) ON DELETE CASCADE
);

CREATE TABLE policy_available_at (
	policy_id VARCHAR(6) NOT NULL,
    service_center_branch_id VARCHAR(6) NOT NULL,
    service_center_id VARCHAR(6) NOT NULL,
    PRIMARY KEY(policy_id, service_center_branch_id, service_center_id),
    FOREIGN KEY(policy_id) REFERENCES policy(policy_id) ON DELETE CASCADE,
    FOREIGN KEY(service_center_branch_id, service_center_id) REFERENCES service_center_branch(service_center_branch_id, service_center_id) ON DELETE CASCADE
);

CREATE TABLE product_has_policy (
	policy_id VARCHAR(6) NOT NULL,
    uuid INT NOT NULL,
    policy_start_date DATE NOT NULL,
    policy_end_date DATE NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    PRIMARY KEY(policy_id, uuid),
    FOREIGN KEY(policy_id) REFERENCES policy(policy_id) ON DELETE CASCADE,
    FOREIGN KEY(uuid) REFERENCES purchased_product(uuid) ON DELETE CASCADE
);

CREATE TABLE pp_classify_as (
	uuid INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY(uuid, category_id),
    FOREIGN KEY(uuid) REFERENCES purchased_product(uuid) ON DELETE CASCADE,
    FOREIGN KEY(category_id) REFERENCES product_category(category_id) ON DELETE CASCADE
);


INSERT INTO customer_account(username, password, email)
VALUES ('chchadaa','chada1','chada@gmail.com'),
('somd99','som2','somroutine@gmail.com'),
('praaewpun','praew3','merrypraeww@gmail.com'),
('por_trin','por4','melonn.qq@gmail.com'),
('ploinrch','ploi5','ploiniracha@gmail.com'),
('Ohmpudit','ohmpwd','ohmpudit@gmail.com'),
('lonelyboi','klodpwd','klod@gmail.com');

INSERT INTO customer(customer_id, firstname, lastname, phone_no, birth_date, gender, account_id)
VALUES ('1','Apichada','Achanan','0822207334','1999-4-21','F','1'),
('2','Som','Somlastname','0895511663','1999-1-20','M','2'),
('3','Praewpun','Praewlastname','0972279898','1998-11-24','F','3'),
('4','Trin','Porlastname','0837779292','1998-5-4','M','4'),
('5','Niracha','Ploilastname','0877150888', '1998-9-14','F','5'),
('6','Pudit','Deawpanich','0814094784','1999-2-12','M','6'),
('7','Sagun','Phetkaew','0945593842','1998-7-3','M','7');

INSERT INTO customer_address(customer_id, address_id, house_no, street, sub_district, district, province, zipcode)
VALUES ('1','1','23/4','Sathorn','Silom','Sathorn','Bangkok','10120'),
('1','8','888','Sathorn-test','Silom','Sathorn','Bangkok','10120'),
('2','2','144/2','-','Ban Nuea','Khwae Yai','Kanchanaburi', '71000'),
('3','3','599/97','Nonsi Road','Chongnonsi','Yannawa','Bangkok', '10120'),
('3','4','131/9-10','Wat Kak','Silom','Sathorn','Bangkok', '10120'),
('4','5','132/33','Por road','Luk 4','Lat yai','Nonthaburi','20500'),
('4','6','100/21','Trin Road','Vertical','Ari','Bangkok','12100'),
('5','7','5/123','Q-house road', 'Krung thonburi','Fung thon','Bangkok','10300');

INSERT INTO product_category(category_name)
VALUES ('Wall & Floor'),
('Bathroom'),
('Kitchen'),
('Furniture Lifestyle'),
('Lighting'),
('Home Appliances'),
('Doors & Windows'),
('Paint & Equipment'),
('Tools & Hardware'),
('Garden - Plumbing - DIY'),
('Promotion');

INSERT INTO root_account(root_id, username, password, type)
VALUES ('000001','IKEA', 'Ikeapassword','R'),
('000002','Boonthavorn', 'BTVpassword','R'),
('000003','Show Huay', 'showhuaypwd','T'),
('000004','ZARA HOME', 'ZARApwd','R'),
('R00005','Tesco Lotus', 'TCpwd','R'),
('R00006','IT city', 'ITpwd','R'),
('R00007','HP', 'HPpwd','S'),
('R00008','Dell', 'DELLpwd','S'),
('S00001','Power Buy','PBpwd','S'),
('S00002','INDEX Living furnitures','INDEXpwd','S'),
('S00003','SB Furniture','SBpwwd','S'),
('S00004','HOME PRO','HPpwd','S');

INSERT INTO policy_owner(policy_owner_id, owner_type) 
VALUES ('IKEA01', 'R'),
('BTV002', 'R'),
('ZARA04', 'R'),
('SUP01', 'S'),
('SUP02', 'S'),
('SUP03', 'S'),
('SUP04', 'S'),
('SH01', 'T'),
('TC0001','R'),
('IT0001','R'),
('HP0001','S'),
('DE0001','S'),
('KC0001','S');


INSERT INTO retailer(retailer_id, retailer_contact, retailer_name, retailer_hq_address, retailer_description, root_id, policy_owner_id)
VALUES ('000001','0972279898', 'IKEA','Bangna','Furnitures imported from Sweden','000001','IKEA01'),
('000002','0972279898', 'Boothavorn','Suhhumvit53','Mostly about floor','000002','BTV002'),
('000003','0852289888', 'Zara home','Paragon','Furnitures with clothing brands','000004','ZARA04'),
('R00004','026576031','Tesco Lotus','Rama 3','Sell daily-life furnitures','R00005','TC0001'),
('R00005','026565030','IT city', 'Pantip','Sell technology','R00006','IT0001');

INSERT INTO retailer_branch(retailer_id, retailer_branch_id, retailer_branch_name, retailer_branch_contact, retailer_branch_address)
VALUES ('000001', '00001A','IKEA Nonthaburi', '0981234567','56/56 giodano, whatever road, Nonthaburi 10120'),
('000001', '00001B','IKEA Bangna', '0123454567','123, bangna road, Bangkok 10520'),
('000001', '00001C','IKEA Lat Prao', '0977234567','11/98 Lat Prao road, Bangkok 10500'),
('000002', '00002A','Boothavorn Nonthaburi', '0881234567','131/11, whatever road, Nonthaburi 13100'),
('000002', '00002B','Boothavorn Sukhumvit', '0811234567','123/44 Sukhumvit 77, Bangkok 10120'),
('000002', '00002C','Boothavorn Lat yao', '0981234598','Lat Yao, Bangkok 10120'),
('000003', '00003A','Zara Paragon', '0981234556','44 Rama1 road, Bangkok 10120'),
('R00004', 'R0004A','Tesco lotus rama3', '026810920','172 Narathiwat Rajanagarindra road, Chongnonsi, Yannawa, Bangkok 10120'),
('R00004', 'R0004B','Tesco Lotus Chamchuri Square', '026576031','317 Rama4 road, Pathum Wan, Bangkok 10330'),
('R00004', 'R0004C','Tesco Lotus Fortune Town', '026420500','7/1 Ratchadaphisek road, Din Daeng, Bangkok 10320'),
('R00005', 'R0005A','IT City Lak4', '025670576','333/100 Lak4 Plaza, Bang Khan, Lak4, Bangkok, 10210'),
('R00005', 'R0005B','IT City Pantip Plaza', '026565030','604/3 Pantip Plaza, Phetburi road, Bangkok 10400');

INSERT INTO role (root_id, username, role_name, password, role_description)
VALUES ('000001', 'klodkup340', 'role1', 'password1', 'roledescription1'),
('000002', 'praewkup340', 'role2', 'password2', 'roledescription2'),
('000003', 'teekup340', 'role3', 'password3', 'roledescription3'),
('000004', 'porkup340', 'role4', 'password4', 'roledescription4');

INSERT INTO _group (group_id, group_name, group_description)
VALUES ('000001', 'group1', 'group1description'),
('000002', 'group2', 'group2description'),
('000003', 'group3', 'group3description'),
('000004', 'group4', 'group4description');

INSERT INTO permission (per_id, per_description, per_name, per_module)
VALUES ('000001', 'permission1', 'permission1name', 'module1'),
('000002', 'permission2', 'permission2name', 'module2'),
('000003', 'permission3', 'permission3name', 'module3'),
('000004', 'permission4', 'permission4name', 'module4');

INSERT INTO group_has_permission (group_id, per_id)
VALUES ('000001', '000001'),
('000002', '000002'),
('000003', '000003'),
('000004', '000004');

INSERT INTO role_has_permission (root_id, username, per_id)
VALUES ('000001', 'klodkup340', '000001'),
('000002', 'praewkup340', '000002'),
('000003', 'teekup340', '000003'),
('000004', 'porkup340', '000004');

INSERT INTO role_in_group (group_id, username, root_id)
VALUES ('000001', 'klodkup340', '000001'),
('000002', 'praewkup340', '000002'),
('000003', 'teekup340', '000003'),
('000004', 'porkup340', '000004');

INSERT INTO supplier (supplier_id, supplier_description, supplier_name, supplier_contact, supplier_address, root_id, policy_owner_id)
VALUES ('000001', 'Sell IT stuffs', 'Power Buy', '0945593841', '5/117', 'S00001', 'SUP01'),
('000002', 'Sell quality furnitures', 'INDEX living malls', '0945593842', '5/118', 'S00002', 'SUP02'),
('000003', 'Sell furnitures', 'SB Furniture', '0945593843', '5/119', 'S00003', 'SUP03'),
('000004', 'Sell trendy furnitures', 'HOME PRO', '0945593844', '5/120', 'S00004', 'SUP04'),
('000005', 'Sell HP product and OEM', 'HP', '0945593843', '345 HP quarter, Bang Khan, Bangkok 10300', 'R00007', 'HP0001'),
('000006', 'Sell DELL product and OEM', 'Dell', '0945593843', '11/12 Dell headquarter, Bangrak, 10120', 'R00008', 'DE0001'),
('000007', 'Sell furnitures', 'Koncept', '0945593843', '11/12 Dell headquarter, Bangrak, 10120', null, 'KC0001');

INSERT INTO Product (product_no, product_model, product_name, product_description, supplier_id)
VALUES ('AAAAA1', 'BBBBB1', 'STEFAN chair', 'A very smart chair', '000001'),
('AAAAA2', 'BBBBB2', 'INGO table', 'A very smart table', '000001'),
('AAAAA3', 'BBBBB3', 'table', 'A very smart table', '000002'),
('AAAAA4', 'BBBBB4', 'sofa', 'A very smart sofa', '000002'),
('AAAAA5', 'BBBBB5', 'fan', 'A very smart fan', '000003'),
('AAAAA6', 'BBBBB6', 'fridge', 'A very smart fridge', '000003'),
('AAAAA7', 'BBBBB7', 'washing machine', 'A very smart washing machine', '000004'),
('AAAAA8', 'BBBBB8', 'lamp', 'A very smart lamp', '000004'),
('AAAAA9', 'BBBBB9', 'microwave', 'A very smart microwave', '000005'),
('AAAA10', 'BBBB10', 'air conditioner', 'A very smart air conditioner', '000005'),
('AAAA11', 'BBBB11', 'air dryer', 'A very smart air dryer', '000006'),
('AAAA12', 'BBBB12', 'coffee maker', 'A very smart coffee maker', '000006'),
('AAAA13', 'BBBB13', 'blender', 'A very smart blender', '000007'),
('AAAA14', 'BBBB14', 'toaster', 'A very smart toaster', '000007'),
('AAAA15', 'BBBB15', 'oven', 'A very smart oven', '000001'),
('AAAA16', 'BBBB16', 'clothes dryer', 'A very smart clothes dryer', '000002'),
('AAAA17', 'BBBB17', 'dish washer', 'A very smart dish washer', '000003'),
('AAAA18', 'BBBB18', 'pressure cooker', 'A very smart pressure cooker', '000004'),
('AAAA19', 'BBBB19', 'electric guitar', 'A very smart electric guitar', '000005'),
('AAAA20', 'BBBB20', 'smartphone', 'A very smart smartphone', '000006'),
('AAAA21', 'BBBB21', 'JANINGE chair', 'function and quality in one chair', '000001'),
('AAAA22', 'BBBB22', 'VANGSTA table', 'A durable dining table that makes it easy to have big dinners.', '000001');


INSERT INTO purchased_product (serial_no, product_no, customer_id, product_nickname, price, invoice_id, create_timestamp, retailer_branch_id, retailer_id, invoice_photo, is_validate, product_photo, claim_qty, warranty_photo)
VALUES ('SSSSS1', 'AAAAA1', '1', 'my chair', '2500', '000001', '2020-03-03', '00001A', '000001', 'photo1', True, 'https://www.ikea.com/th/en/images/products/stefan-chair__0727320_PE735593_S5.JPG', '1', 'warrantyphoto1'),
('SSSSS2', 'AAAAA2', '2', 'my table', '3000', '000002', '2020-03-03', '00001A', '000001', 'photo2', True, 'https://www.ikea.com/th/en/images/products/ingo-table-pine__0737092_PE740877_S5.JPG', '1', 'warrantyphoto4'),
('SSSSS7', 'AAAAA6', '1', 'my fridge', '6000', '000006', '2020-03-03', '00001A', '000001', 'photo3', True, 'https://images-na.ssl-images-amazon.com/images/I/61TPUNRED3L._AC_SX522_.jpg', '1', 'warrantyphoto4'),
('SSSSS8', 'AAAAA7', '1', 'my washing machine', '2500', '000007', '2020-03-03', '00001A', '000001', 'photo3', True, 'https://reviewed-com-res.cloudinary.com/image/fetch/s--66CnV-qU--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,h_668,q_auto,w_1187/https://reviewed-production.s3.amazonaws.com/1572277950000/LG-WM3900HWA-Vanity.jpg', '1', 'warrantyphoto4'),
('SSSSS9', 'AAAAA8', '1', 'my lamp', '2500', '000008', '2020-03-03', '00001B', '000001', 'photo3', True, 'https://www.boconcept.com/on/demandware.static/-/Sites-master-catalog/default/dwcfe950b0/images/1100000/1106997.jpg', '1', 'warrantyphoto4'),
('SSSS10', 'AAAAA9', '1', 'my microwave', '2500', '000009', '2020-03-03', '00002A', '000002', 'photo3', True, 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3901/3901007cv12d.jpg', '1', 'warrantyphoto4'),
('SSSS11', 'AAAA10', '1', 'my air conditioner', '2500', '0000010', '2020-03-03', '00002A', '000002', 'photo3', True, 'https://5.imimg.com/data5/WL/UO/AX/ANDROID-90193607/product-jpeg-500x500.jpg', '1', 'warrantyphoto4'),
('SSSS12', 'AAAA11', '1', 'my dryer', '2500', '000011', '2020-03-03', '00002B', '000002', 'photo3', True, 'https://images.homedepot-static.com/productImages/ef33d316-3fa6-4e90-8d52-1fc65baee64c/svn/white-lg-electronics-electric-dryers-dle3500w-64_1000.jpg', '1', 'warrantyphoto4'),
('SSSS13', 'AAAA12', '1', 'my coffee maker', '2500', '000012', '2020-03-03', '00003A', '000003', 'photo3', True, 'https://res.cloudinary.com/cenergy-innovation-limited-head-office/image/fetch/c_scale,q_70,f_auto,h_740/https://d1dtruvuor2iuy.cloudfront.net/media/catalog/product/p/w/pwb000251296.jpg', '1', 'warrantyphoto4'),
('SSSS14', 'AAAA13', '1', 'my blender', '2500', '000013', '2020-03-03', '00003A', '000003', 'photo3', True, 'https://www.princesshome.eu/product/image/medium/01.212079.01.001_1.jpg', '1', 'warrantyphoto4'),
('SSSS15', 'AAAA14', '1', 'my toaster', '2500', '000014', '2020-03-03', '00003A', '000003', 'photo3', True, 'https://target.scene7.com/is/image/Target/GUEST_8cbce1ab-9e22-4e87-8828-397ec97fc2e6?wid=488&hei=488&fmt=pjpeg', '1', 'warrantyphoto4'),
('SSSS16', 'AAAA21', '1', 'my chair', '2500', '000014', '2020-03-03', '00001A', '000001', 'photo3', True, 'https://www.ikea.com/th/en/images/products/janinge-chair__0728156_PE736116_S5.JPG', '1', 'warrantyphoto4'),
('SSSS17', 'AAAA22', '1', 'my table', '2500', '000014', '2020-03-03', '00001A', '000001', 'photo3', True, 'https://www.ikea.com/th/en/images/products/vangsta-extendable-table__0809397_PE771036_S5.JPG', '1', 'warrantyphoto4');

INSERT INTO Policy(policy_id, policy_period, policy_description, date_created, policy_owner_id) 
VALUES ('001', '3 years', 'The guarantee remains in force for 3 years and is valid from the date of purchase. The original purchase receipt is required as proof of purchase.', DATE'2020-12-15', 'IKEA01'),
('002', '1 year', 'Mediocre policy', DATE'2020-1-9', 'BTV002'),
('003', '0.5 year', 'Awful policy', DATE'2020-4-13', 'ZARA04');

INSERT INTO product_classify_as(category_id, product_no) 
VALUES ('4', 'AAAAA1'),
('4', 'AAAAA2'),
('4', 'AAAAA3'),
('4', 'AAAAA4'),
('6', 'AAAAA5'),
('6', 'AAAAA6'),
('6', 'AAAAA7'),
('6', 'AAAAA8'),
('3', 'AAAAA9'),
('6', 'AAAA10'),
('6', 'AAAA11'),
('6', 'AAAA12'),
('3', 'AAAA13'),
('3', 'AAAA14'),
('3', 'AAAA15'),
('3', 'AAAA16'),
('3', 'AAAA17'),
('3', 'AAAA18'),
('9', 'AAAA19'),
('9', 'AAAA20');

INSERT INTO product_has_policy(policy_id, uuid , policy_start_date, policy_end_date, timestamp) 
VALUES ('001', '1', DATE'2019-03-30', DATE'2020-12-15', TIMESTAMP'2008-01-01 00:00:01'),
('001', '2', DATE'2019-04-02', DATE'2020-12-16', TIMESTAMP'2008-01-01 00:00:02'),
('001', '3', DATE'2019-03-31', DATE'2020-12-16', TIMESTAMP'2008-01-01 00:00:03'),
('001', '4', DATE'2019-04-01', DATE'2020-12-17', TIMESTAMP'2008-01-01 00:00:04'),
('001', '5', DATE'2019-04-01', DATE'2020-12-17', TIMESTAMP'2008-01-01 00:00:04'),
('002', '6', DATE'2019-04-01', DATE'2020-12-17', TIMESTAMP'2008-01-01 00:00:04'),
('003', '7', DATE'2019-04-01', DATE'2020-12-17', TIMESTAMP'2008-01-01 00:00:04'),
('002', '8', DATE'2019-04-01', DATE'2020-12-17', TIMESTAMP'2008-01-01 00:00:04'),
('002', '9', DATE'2019-04-01', DATE'2020-05-03', TIMESTAMP'2008-01-01 00:00:04'),
('003', '10', DATE'2019-04-01', DATE'2020-05-02', TIMESTAMP'2008-01-01 00:00:04'),
('003', '11', DATE'2019-04-01', DATE'2020-05-01', TIMESTAMP'2008-01-01 00:00:04'),
('001', '12', DATE'2019-02-02', DATE'2020-11-14', TIMESTAMP'2008-01-01 00:00:03'),
('001', '13', DATE'2019-03-03', DATE'2020-10-16', TIMESTAMP'2008-01-01 00:00:05');


INSERT INTO service_center(service_center_id, service_center_name, service_center_hq_address, service_center_description)
VALUES ('1', 'IKEA service', 'Bangna', 'This place services IKEA'),
('2', 'Boonthavorn service', 'Sukhumvit53', 'This place services Boonthavorn'),
('3', 'ZARA home service', 'Paragon', 'This place services ZARA home');

INSERT INTO service_center_branch(service_center_branch_id, service_center_id, service_center_branch_name, service_center_branch_contact, service_center_branch_address)
VALUES ('1', '1', 'Bangna', '020000000', 'Bangna, Bangkok, 12345'),
('1', '2', 'Ratchada', '021234567', 'Ratchada, Bangkok, 12345'),
('1', '3', 'Paragon', '027777777', 'Paragon, Bangkok, 12345'),
('2', '1', 'Moon', '029999999', 'Dark side of the Moon'),
('2', '2', 'Puttamonthol', '029876543', 'Puttamonthol, Bangkok, 12345'),
('2', '3', 'Central World', '028888888', 'Central World, Bangkok, 12345');

INSERT INTO policy_available_at(policy_id, service_center_branch_id, service_center_id) 
VALUES ('001', '1', '1'),
('002', '2', '1'),
('003', '1', '2');

INSERT INTO third_party(third_party_id, third_party_address, third_party_name, third_party_contact, third_party_description, root_id, policy_owner_id)
VALUES ('000001', 'MBK', 'ShowHuay', '0860623462', 'Shady third party', '000003', 'SH01');

INSERT INTO claim_log (status, timestamp, uuid, service_center_id, service_center_branch_id)
VALUES ('status1', '2020-03-03', '1', '1', '1'),
('status2', '2020-03-04', '2', '2', '2'),
('status3', '2020-03-05', '3', '3', '2'),
('status4', '2020-03-06','4', '2', '1');

CREATE TABLE notification (
	noti_id INT AUTO_INCREMENT NOT NULL,
	message VARCHAR(256) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
    customer_id INT NOT NULL,
    PRIMARY KEY (noti_id),
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id)); 
    
INSERT INTO notification(message, timestamp, customer_id) 
VALUES ('The product has been claimed', '2020-01-18 11:00:01', '1'),
('Expiration date tomorrow', '2020-02-18 11:00:01', '2'),
('Promotion for curry', '2020-03-18 11:00:01', '3');

INSERT INTO pp_classify_as(uuid, category_id)
VALUES ('1','1'),
('2','2'),
('3','3'),
('4','4');



CREATE TRIGGER add_profile
AFTER INSERT ON customer_account
FOR EACH ROW
INSERT INTO customer(customer_id, firstname, lastname, phone_no, birth_date, gender, account_id)
VALUES(new.account_id, null, null, null, null, null , new.account_id);
