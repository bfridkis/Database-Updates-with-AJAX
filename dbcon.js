var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_fridkisb',
  password        : 'Raphis4life',
  database        : 'cs290_fridkisb'
});

module.exports.pool = pool;