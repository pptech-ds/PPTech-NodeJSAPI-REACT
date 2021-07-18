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
app.use(cors());

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
    db.query('SELECT email FROM user WHERE email = ?', [email.trim()], async (error, result) =>{
        if(error){
            console.log(error);
        }

        // if the result of the previous query is > 0, that means an email already exists
        if(result.length > 0){
            return res.json({
                message: 'Provided email already used'
            })
        }
        //  checking if the given passwords corresponds
        else if (password.trim() !== passwordConfirm.trim()) {
            return res.json({
                message: 'Provided passwords does not match'
            })
        } 
        // checking if email and password are not empty
        else if(email.trim().length === 0 || password.trim().length === 0 || password.trim().length < 5) {
        // 400 for bad http request
        return res.status(400).json({
            message: 'email, password have to be filled and password length must at leat 6 characters'
        });
    }

        // hashing the password to secure it
        let hashedPassword = await bcrypt.hash(password.trim(), 10)
        // printing the hashed password in cosole to check 
        console.log(hashedPassword);

        // if all previous checks are clean, we can insert our user into our database
        db.query('INSERT INTO user SET ?', {email: email.trim(), password: hashedPassword}, (error, result) => {
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


// api login
app.post('/login', (req, res) => {
    try {
        // getting body contents
        const {email, password} = req.body;

        // checking if email and password are not empty
        if(email.trim().length === 0 || password.trim().length === 0) {
            // 400 for bad http request
            return res.status(400).json({
                message: 'Please provide a valid email and password'
            });
        }

        // query to select user by provided email
        db.query('SELECT * FROM user WHERE email = ?', [email.trim()], async (error, result) => {
            // printing result in console to check
            console.log(result);

            // if result is empty or compared password is incorrect
            if((result.length == 0)|| !(await bcrypt.compare(password.trim(), result[0].password))){
                // 401 for wrong informations given
                res.status(401).json({
                    message: 'Email or Password incorrect'
                })
            } 
            // if all previous checks are clean, let's login the user
            else {
                // getting user id
                const id = result[0].id;
                // generating jwt token for this specific user, necessary for navigations
                const token = jwt.sign({id}, 'jwt_test_pass', {
                    // defining expiration date for generated token, here 10 days
                    expiresIn: '10d'
                });

                // printing generated token in console to check
                console.log('the token is : ' + token);

                // adding some cookie options
                const cookieOptions = {
                    // cookie expiration date : days x hours (24 in one day) x 60 (60 minutes in 1 hour) x 60 (60 seconds in 1 minute) x 1000 (1000 milliseconds in 1s)
                    expires: new Date(
                        Date.now() + 10 * 24 * 60 * 60 * 1000
                    ),
                    // to secure XSS injection
                    httpOnly: true 
                }

                // generating the JWT cookie
                res.cookie('jwt', token, cookieOptions);

                // retrun status 200 if everything happend correctly
                res.status(200).json({
                    result
                });  
            }
        })
    } catch (error) {
        console.error(error);
    }
})


// port from where our api will be used
const PORT=3005;


// starting to listen events on specified port
app.listen(PORT,()=>{
    console.log(`App is live at ${PORT}`);
});