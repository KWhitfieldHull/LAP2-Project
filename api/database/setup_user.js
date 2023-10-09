const fs = require('fs');
require("dotenv").config();

const db = require("./connect_user");

const sql = fs.readFileSync(__dirname+ '/setup_user.sql').toString();

db.query(sql)
    .then(data => {
        db.end();
        console.log("User Set-up complete.");
    })
    .catch(error => console.log(error));