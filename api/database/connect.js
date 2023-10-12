const { Pool } = require("pg");

const db = new Pool({
    connectionString: process.env.DB_URL
})

console.log("Recycling DB connection established.")

module.exports = db;