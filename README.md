# Reference-Documentations
- [Install NodeJS for Ubuntu](https://doc.ubuntu-fr.org/nodejs)  
- [NPM Docs](https://docs.npmjs.com/)  
- [SQL Management with NodeJS](https://www.w3schools.com/nodejs/nodejs_mysql.asp)
- [Cookie Options](https://developer.mozilla.org/fr/docs/Web/HTTP/Cookies)

# Install-NodeJS-Ubuntu 
- Install
```console
sudo apt-get update
sudo apt-get install nodejs npm
sudo ln -s /usr/bin/nodejs /usr/local/bin/node
sudo ln -s /usr/bin/npm /usr/local/bin/npm
```
- Check installation
```console
node -v
```
![image](https://user-images.githubusercontent.com/61125395/126072607-41e65942-22eb-4fc5-9ec8-60eff7e7fde0.png)

# NodeJS-API
## Dependencies-management
1. Create directory "api" and go into that to init the project to have "package.json" file where all our dependencies will be installed  
```console
npm init -y
```
![image](https://user-images.githubusercontent.com/61125395/126072774-995ffd43-4161-42e2-95b2-eb55d97f7691.png)

2. Install necessary depencies for our project  
  - Some explanations about installed packages:
    * express : necessary to define routes of your application based on HTTP methods and URLs.
    * body-parser : necessary to handle HTTP requests and extract body content.
    * cookie-parser : necessary to parse cookies in the navigator.
    * bcryptjs : necessary to hash the password.
    * cors: Cross-Origin Resource Sharing, necessary to allow requested resources on a web server depend on where the HTTP request was initiated.
    * mysql : necessary to handle SQL database.
    * jwtwebtoken : JSON Web Token (JWT) which is a JSON object, and necessary to create unique token per user logged into our app.
    * nodemon : usefull in developpement, will restart automatically the server if any change is detected in our files.
    ```console
    npm i express mysql cookie-parser jsonwebtoken bcryptjs nodemon
    ```
![image](https://user-images.githubusercontent.com/61125395/126073070-d5d54ae7-3496-413c-8801-15cbf40aceee.png)

3. Add in file "package.json" in part "scrpit" nodemon command to easily start it with command "npm start":  
```json
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.5",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mysql": "^2.18.1",
    "nodemon": "^2.0.12"
  }
}
```
4. Add ".gitignore" file at the root of the project to avoid to upload "node_modules" into our git repo
![image](https://user-images.githubusercontent.com/61125395/126073937-5fc83251-75d0-40cc-b894-dcdbaf2e2b55.png)

## Create-database  
About our database, I decided to use SQL database, our database will be called "lettria" and our table "user", the table "user" will contain 3 columns, "id" integer, "email" varchar (255), and "password" varchar(255)  
I created 3 files to manage SQL database, to execute the scripts, you just need to do "node <script_name>":
- "create_database.js": create database called "lettria"
- "create_tables.js": create table called "user" in our database "lettrie"
- "drop_databse.js": drop our database "lettria" if necessary

## Api-Registration 
1. About the API  
Our first api will be used to register the user, short summary of the process:  
  - check if the given "email" already exists in the database
  - if not, check the given 2 passwords correspond
  - if all previous checks are clean, we hash the given password to encrypt it using "bcrypt"  
  - and finally we insert the user in the database  
You can find all details into the code in file "index.js", all steps are commented inside it.  
2. API tests  
Let's check our API using POSTMAN:  
  - Let's try to insert a user, but the 2 given passwords don't match:
  ![image](https://user-images.githubusercontent.com/61125395/126076797-0745474b-6fd7-4f39-afed-5fb6c9a04761.png)
  - Let's try to insert a user, passwords match:  
  ![image](https://user-images.githubusercontent.com/61125395/126076843-d124e168-697e-4108-bc89-bb7a777acf08.png)
  - Let's check in our database if the user is corerctly inserted with hashed password:  
  ![image](https://user-images.githubusercontent.com/61125395/126076870-83a96dc1-cbc5-45b5-8d8f-98b626f46908.png)
  - Let's try to insert again the same user:  
  ![image](https://user-images.githubusercontent.com/61125395/126076899-fda4c081-950c-4580-a3f5-e6177136058e.png)  
We can say our API is functional as we expected. 

## Api-Login
1. About the API  
Our second api will be used to login, short summary of the process:  
  - checking if provided email or password are not empty, if one of thoses are empty we provided error 400 (bad request)  
  - if the previous check is correct, we query into our database using given "email"
  - we check if results is not empty and we compare the given password with existing one in the database using "bcrypt"  
  - if all previous checks are clean, we get the user id and we generate the JWT token, necessary to navigate using user informations in the browser  
  - we define also some cookie options, like limit of time where the cookie will be usable, and we secure also any XSS injection 
2. API tests  
Let's check our API using POSTMAN:  
  - Let's try to provide empty email or password:  
  ![image](https://user-images.githubusercontent.com/61125395/126078003-505883e4-1e28-49d0-a3a2-ea954dc4ef24.png)
  - Let's try to login using wrong email:  
  ![image](https://user-images.githubusercontent.com/61125395/126078061-d0301f89-84ab-4248-87d1-20e70914e2b0.png)
  - Let's try to login using correct credentials:  
  ![image](https://user-images.githubusercontent.com/61125395/126078090-4918fd46-8d43-4f72-a70f-7ed306f8e4f3.png)  
We can say our API is functional as we expected. 

# REACT
## Project-Init
1. In order to init project files structure I followed instructions given in [REACT Documentation](https://fr.reactjs.org/docs/create-a-new-react-app.html)  
```console
npx create-react-app app
cd app
npm start
```

2. Install necessary depencies for our project  
  - Some explanations about installed packages:
    * axios: necessary to handle HTTP requests from our REACT app to api
    * react-router-dom: necessary to handle routes 
    ```console
    npm i axios react-router-dom
    ```



