var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'us-cdbr-iron-east-05.cleardb.net',
  user            : 'b8d70b6160984d',
  password        : '4a3af80b',
  database        : 'heroku_a9252b4ebd7bc4a'
});

module.exports.pool = pool;