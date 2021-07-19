# Table of Contents 
- [About-The-Project](#About-The-Project)  
- [Quick-Start](#Quick-Start)  
- [Reference-Documentations](#Reference-Documentations)
- [Install-NodeJS-Ubuntu](#Install-NodeJS-Ubuntu)  
- [NodeJS-API](#NodeJS-API)  
  - [Dependencies-management](#Dependencies-management)
  - [Create-database](#Create-database)
  - [Api-Registration](#Api-Registration)
  - [Api-Login](#Api-Login)
- [REACT](#REACT)
  - [Project-Init](#Project-Init)
  - [About-The-Front](#About-The-Front)
  - [Some-trials](#Some-trials)

 

# About-The-Project  
This project was created for one of my technical test, I have to create registration and login app using NodeJS for API part, and REACT for front. For database I decided to use SQL because this is the one I am using at the moment.

# Quick-Start
You will need at least 2 terminals, one to launch the API, and another one to launch the APP, your API will be launched on PORT 3005, and your APP on PORT 3000. 
- Clone that project:  
```console
git clone https://github.com/pptech-ds/PPTech-NodeJSAPI-REACT.git
cd PPTech-NodeJSAPI-REACT
```
- First terminal for API: Install dependencies launch it:
```console
cd api
npm install
npm start
```
- Second terminal for APP: Install dependencies launch it:
```console
cd app
npm install
npm start
```
- Goto "http://localhost:3000" and you have to see the APP functional.  

# Reference-Documentations
- [Install NodeJS for Ubuntu](https://doc.ubuntu-fr.org/nodejs)  
- [NPM Docs](https://docs.npmjs.com/)  
- [SQL Management with NodeJS](https://www.w3schools.com/nodejs/nodejs_mysql.asp)
- [Cookie Options](https://developer.mozilla.org/fr/docs/Web/HTTP/Cookies)
- [REACT Documentation](https://fr.reactjs.org/docs/create-a-new-react-app.html) 
- [Tutorial to Understand the basics](https://medium.com/@sarthakmittal1461/to-build-login-sign-up-and-logout-restful-apis-with-node-js-using-jwt-authentication-f3d7287acca2) 

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
    npm i express mysql cookie-parser jsonwebtoken bcryptjs cors nodemon
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
    * react-bootstrap bootstrap@5.0.2: to have smarter view of our pages
    ```console
    npm i axios react-router-dom react-bootstrap bootstrap@5.0.2
    npm start
    ```
    
## About-The-Front
I didn't have any knowledge on REACT before starting this project, so I did really some basics. I splitted the pages into "components" directory, that directory contains 4 pages, 1 to manage the navigation code using <ul> and <il> as usual, 1 for registration form, and another one for login form. Nothing else to say, most of the technical part is done un API parts. 
    
 
## Some-trials
  - Our App will be launched on "http://localhost:3000/":  
  ![image](https://user-images.githubusercontent.com/61125395/126089638-e73ddc36-4850-4c7f-ae3f-3e1a88e3c309.png)
  - Let's click on "Registration" to add user in our database, we can see a basic page for registration: 
  ![image](https://user-images.githubusercontent.com/61125395/126089746-b8598bec-ae1b-49b2-adcb-1a725fc89b97.png)
  - Let's try to add a user with empty emmail or password, we can a message showing you some constraints to respect:  
  ![image](https://user-images.githubusercontent.com/61125395/126089840-93fe00b0-ab0f-4848-a2c0-1c26071b3797.png)
  - Let's try to add a user with email and not matching password, we can see a message saying there is a missmatch on given passwords:  
  ![image](https://user-images.githubusercontent.com/61125395/126089938-52db2203-e0f8-4f81-bec1-b642197c5c7f.png)
  - Let's add a user with all constraints, we can see a message saying that user is registered:  
  ![image](https://user-images.githubusercontent.com/61125395/126090033-67927fdf-849e-452c-b53b-9ab0d478ff23.png)
  - We can check that in our database, we can see that user "user_lettria@test.com" was correctly added with hashed password:    
  ![image](https://user-images.githubusercontent.com/61125395/126090167-50c72e9b-183f-4fa5-a5ea-2b5d2d983fd0.png)
  - Now let's register again with the same user, we can a message saying that user is already in our database:  
  ![image](https://user-images.githubusercontent.com/61125395/126090303-297c1320-efaa-4c5e-80e3-7702cd9d10ed.png)
  - Let's try to login with a user which is not in our database, we can see message saying that user or password is incorrect:  
  ![image](https://user-images.githubusercontent.com/61125395/126090372-658fec14-5e2d-493a-85d6-394e5b491cd2.png)
  - Let's loggin with user we have previously added "user_lettria@test.com", we can see that user is correctly logged in:  
  ![image](https://user-images.githubusercontent.com/61125395/126090465-4b3d4653-569d-41e2-bede-599440c65b34.png)
  - We can also check in the console that the JWT token is generated once the user logged in:  
  ![image](https://user-images.githubusercontent.com/61125395/126090592-aa5d6d47-c5a2-4007-a551-3e24285c9726.png)

  









