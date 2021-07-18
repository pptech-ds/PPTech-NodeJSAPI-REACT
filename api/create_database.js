var mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
})

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('Connected to SQL database');
        var sqlQuery = 'CREATE DATABASE lettria';
        db.query(sqlQuery, (error) => {
            if(error) {
                console.log(error)
            } else {
                console.log('Database lettria created');
                process.exit(0);
            } 
        })
    } 
})

