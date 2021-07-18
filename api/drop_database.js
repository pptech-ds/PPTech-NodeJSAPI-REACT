var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});


con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to SQL database');
  con.query('DROP DATABASE lettria', function (err, result) {
    if (err) throw err;
    console.log('Database lettria dropped');
    process.exit(0);
  });
});

