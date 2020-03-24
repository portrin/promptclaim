module.exports = class Product {
    constructor(serialNo, number, model, description, category, status, price, supplier) {
        this.serialNo = serialNo;
        this.number = number;
        this.model = model;
        this.description = description;
        this.category = category;
        this.status = status;
        this.price = price;
        this.supplier = supplier;
    }

    save() {
        return db.execute(
            'INSERT INTO products (serialNo, number, model, description, category, status, price, supplier) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [this.serialNo = serialNo,
            this.number = number,
            this.model = model,
            this.description = description,
            this.category = category,
            this.status = status,
            this.price = price,
            this.supplier = supplier]
        );
    }

    static deleteById(id) {
        //DELETE
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(id, cb) {
        return db.execute(
            'SELECT * FROM products WHERE products.id = ?',
            [id]
        );
    }
}