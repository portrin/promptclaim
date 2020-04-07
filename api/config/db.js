const mysql = require('mysql');

const config = {
    setup: {
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'promptclaim',
        port: 3306    }
};
// connect to mysql
const db = mysql.createConnection(config.setup);
db.connect((err) => {
    if (err) throw err;
    console.log('mysql connected as id ' + db.threadId);
});


module.exports = db;