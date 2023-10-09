const { Pool } = require("pg");

const db = new Pool({
    connectionString: process.env.DB_URL_DIARY
})

console.log("Recycling DB connection established.")

module.exports = db;