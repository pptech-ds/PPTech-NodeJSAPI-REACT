// necessary packages importation
const express = require('express');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');


// will be used to manage our routes
const app = express();

// parse JSON bodies (as sent by API Clients)
app.use(express.json());

// database connection informations
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lettria'
});


// test our database connection
db.connect( (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('Connected to lettria SQL database');
    }
})


// api register
app.post('/register', (req, res) => {
    // printing in console body contents
    console.log(req.body);

    // getting body contents
    const {email, password, passwordConfirm} = req.body;

    // SQL query to check if the given email doesnt exist in our database
    db.query('SELECT email FROM user WHERE email = ?', [email], async (error, results) =>{
        if(error){
            console.log(error);
        }

        // if the result of the previous query is > 0, that means an email already exists
        if(results.length > 0){
            return res.json({
                message: 'Provided email already used'
            })
        }
        //  checking if the given passwords corresponds
        else if (password !== passwordConfirm) {
            return res.json({
                message: 'Provided passwords does not match'
            })
        }

        // hashing the password to secure it
        let hashedPassword = await bcrypt.hash(password, 8)
        // printing the hashed password in cosole to check 
        console.log(hashedPassword);

        // if all previous checks are clean, we can insert our user into our database
        db.query('INSERT INTO user SET ?', {email: email, password: hashedPassword}, (error, results) => {
            if(error){
                console.log(error);
            } else {
                return res.json({
                    message: 'User Registered'
                }) 
            }
        })
    });

})


// port from where our api will be used
const PORT=3000;


// starting to listen events on specified port
app.listen(PORT,()=>{
    console.log(`App is live at ${PORT}`);
});