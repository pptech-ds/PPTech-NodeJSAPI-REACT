var mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lettria'
})

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('Connected to SQL database');
        var sqlQuery = 'CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_general_ci` ENGINE = InnoDB';
        db.query(sqlQuery, (error) => {
            if(error) {
                console.log(error)
            } else {
                console.log('table user in database lettria created');
                process.exit(0);
            } 
        })
    } 
})
