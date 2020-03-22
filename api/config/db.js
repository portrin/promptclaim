const mysql = require('mysql');

const config = {
    setup: {
        host     : 'localhost',
        user     : 'root',
        password : 'pwd',
        database : 'promptclaim',
        port: 8083
    }
};
// connect to mysql
const db = mysql.createConnection(config.setup);
db.connect((err) => {
    if (err) throw err;
    console.log('mysql connected as id ' + db.threadId);
});


module.exports = db;