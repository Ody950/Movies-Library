# Movies Library -  Version One

**Author Name**: *Odai Al-Obeidat*

### WRRC
![Movies Library -WRRC](./Movie%20Data/WRRC%20PG.jpg)



### Overview
working on Movies-Library 

### Getting Started
**Steps to building and running similar app:**

- Create a repository on GitHub
- Clone the repository on your device
- Initialize it by running ```npm init -y``` command in the tirminal 
- Create basic file structure
- Install the required packages by running ```  npm install ``` command
- Write you code.
    - express
    - const server
    - server.get
    - server.listen
- Test your server by one of this way:
    - Browser
    - Frontend app
    - Thunder client
    - Postman
  
1. Install pg library. ```npm i pg```
2. Require pg library in your server. ```const pg = require('pg');```
3. Create an obj from Client and pass the URL of postgresql server.
   const ```client = new pg.Client('postgresql://localhost:5432/demo15')```
4. Connect the server with demo15 database. client.connect()
5. ```psql -d demo15 -f schema.sql```
6. If you want to read data from post request method, use this middleware: ```server.use(express.json())```




start postgerSQl server : ```sqlstart```
stop postgerSQl server : ```sqlstop```
_______________________________________
Open postgerSQL shell server (SSL mode) : ```psql```
1. List all databases : ```\l```
2. Switch to another database :```\c <db-name>```
3. List database tables : ```\dt```
4. Describe a table :```\d <table-name>```
    - try " ```SELECT * FROM table-name```
5. Quit : ```\q```

### Project Features

- We use ```/trending``` To access the trending movies on the movie db 
- We use ```/search``` To search for a specific movie name in the movie db
-  We use ```/movies-theatres``` To access the theatres movies on the movie db 
-  We use ```/movies-popular``` To access the popular movies on the movie db 
