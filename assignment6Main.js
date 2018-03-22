var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6705);
app.set('mysql', mysql);


app.get('/reset-table',function(req,res,next){
  var context = {};
	mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table Reset";
	  context.jsscripts = ['resetForm.js', 'attributeSelected.js',
						   'addRow.js', 'loadTable.js'];
	  context.css = ['style.css'];
      res.render('home',context);
    });
  });
});

app.get('/',function(req,res,next){
	var context = {};
    var sql = "SELECT * FROM workouts";
    mysql.pool.query(sql, function(err, rows){
		rows.forEach(function(row, i){
			if(rows[i].date){
				rows[i].date = new Date(rows[i].date);
				rows[i].date = rows[i].date.toJSON();
				rows[i].date = String(rows[i].date).substring(0, 10);
			}
		})
		context.rows = rows;
		res.send(JSON.stringify(rows));
    })
});

app.post('/added', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?,?,?,?,?)";
	var inserts = [req.body.name, req.body.reps, req.body.weight, 
				   req.body.date, req.body.lbs];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			//res.write(JSON.stringify(error));
			res.send(JSON.stringify(error));
			res.status(400);
			res.end();
		}
		else{
			sql = "SELECT * FROM workouts";
			mysql.pool.query(sql, function(error, rows, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.status(400);
					res.end();
				}
				else{
					res.send(JSON.stringify(rows));
					res.status(202).end();
				}
			});
		}
	});
});

app.get('/cancel',function(req,res,next){
	var context = {};
    var sql = "SELECT * FROM workouts";
    mysql.pool.query(sql, function(err, rows){
		rows.forEach(function(row){
			if(row[date]){
				row[date] = new Date(rows[date]);
				row[date] = rows[date].toJSON();
				row[date] = String(rows[date]).substring(0, 10);
			}
		})
		context.rows = rows;
		res.send(JSON.stringify(rows));
    })
});


app.get('/update', function(req, res){
	var context = {id : req.query.id,
				   name: req.query.name,
				   reps: req.query.reps,
				   weight: req.query.weight,
				   date: req.query.date,
				   unit: req.query.lbs};
	context.css = ['style.css'];   
	context.jsscripts = ['resetForm.js', 'attributeSelected.js', 'cancelButtonListener.js',
						 'updateInputValidationListener.js'];
	res.render('update', context);
});

app.post('/updated', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	var sql = "UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?";
	var lbs = 0;
	if(req.body.unit === 'lbs'){
		lbs = 1;
	}
	var inserts = [req.body.name, req.body.reps, req.body.weight, 
				   req.body.date, lbs, req.body.id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			//res.write(JSON.stringify(error));
			res.send(JSON.stringify(error));
			res.status(400);
			res.end();
		}
		else{
			context.jsscripts = ['resetForm.js', 'attributeSelected.js',
								 'addRow.js', 'loadTable.js'];
			context.css = ['style.css'];
			res.render('home', context);
		};
	});
});


app.get('/delete/:id', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM workouts WHERE id=?";
	var inserts = [req.params.id];
	sql = mysql.pool.query(sql, inserts, function(error, rows, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.status(400);
			res.end();
		}
		else{
			sql = "SELECT * FROM workouts";
			mysql.pool.query(sql, function(error, rows, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.status(400);
					res.end();
				}
				else{
					res.send(JSON.stringify(rows));
					res.status(202).end();
				}
			})
		}
	});
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on database-updates-with-ajax.herokuapp.com:' + app.get('port') + '; press Ctrl-C to terminate.');
});
	