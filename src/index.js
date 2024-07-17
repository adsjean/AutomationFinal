const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const apiRoutes = require('./api');
const mongoose = require('mongoose');
let shell = require("shelljs");
const bodyParser = require('body-parser');

// Create MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql-295b70c4-dbdev.b.aivencloud.com',
    port: '13399',
    user: 'dbuser',
    password: 'pw2db123!',
    database: 'teste',
});

// Test the MySQL connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
        connection.release(); // Release the connection back to the pool
    }
});


const app = express();
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

//Seta rota para as API passando a conexão Mysql
app.use('/api', apiRoutes(pool));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

//use EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});



//Cadastro esta bloqueado por instantes

// app.get("/signup", (req, res) => {
//     res.render("signup");
// }); 

// // Register User
// app.post("/signup", async (req, res) => {

//     const data = {
//         username: req.body.username,
//         password: req.body.password
//     }

//     // Check if the username already exists in the database
//     const existingUser = await collection.findOne({ username: data.username });

//     if (existingUser) {
//         res.send('User already exists. Please choose a different username.');
//     } else {
//         // Hash the password using bcrypt
//         const saltRounds = 10; // Number of salt rounds for bcrypt
//         const hashedPassword = await bcrypt.hash(data.password, saltRounds);

//         data.password = hashedPassword; // Replace the original password with the hashed one

//         const userdata = await collection.insertMany(data);
//         console.log(userdata);
//         res.render("login");
//     }

// });

// Login user 
app.post("/dashboard", async (req, res) => {    
    try {
        const check = await collection.findOne({ username: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }        
        else {
            // Compare the hashed password from the database with the plaintext password
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (!isPasswordMatch) {
                res.send("wrong Password");
            }
            else {
                shell.exec("npx tsc ./src/m3uParse.ts")  
                await res.render("home");
            }
        }
        
    }
    catch {
        res.send("wrong Details");
    }
});

//Handling user logout 
app.get("/logout", function (req, res) {
		res.redirect('/');
});

//Mensagem para paginas não encontradas
app.use((req, res) => {
    res.status(404)
    res.send('<h1>Error 404: Resource not found</h1>')
    
})

// Connect Mongoose
mongoose.
connect('mongodb+srv://admin:123456789admin@automationnode.pwqpvww.mongodb.net/Node-API?retryWrites=true&w=majority&appName=AutomationNode')
.then(() => {
    console.log('Connected to MongoDB')
    // app.get('/', (req, res) => res.send('Hello World!'))
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    });
}).catch((error) => {
    console.log(error)
}) 


// Define Port for Application
// const port = 5000;
// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`)
// });