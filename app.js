const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });



const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
//require data from body
app.use(express.json());
//parse Json bodies (as sent by API clients)
app.use(cookieParser());
//sử dung cookieParser

app.set('view engine', 'hbs');
db.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log('mysql connected')
    }
})

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(8000, () => {
    console.log('sever started on post 8000');
})