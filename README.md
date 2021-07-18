# Reference-Documentations
- [Install NodeJS for Ubuntu](https://doc.ubuntu-fr.org/nodejs)  
- [NPM Doncs](https://docs.npmjs.com/)  
- [SQL Management with NodeJS](https://www.w3schools.com/nodejs/nodejs_mysql.asp)

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


