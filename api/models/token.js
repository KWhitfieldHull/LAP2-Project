const { v4: uuidv4 } = require("uuid");

const db = require("../database/connect");

class Token {

    constructor({ token_id, user_id, token, username, address, admin, points }) {
        this.token_id = token_id;
        this.user_id = user_id;
        this.token = token;
        this.username = username;
        this.address = address;
        this.admin = admin;
        this.points = points;

    }

    static async create(user_id) {
        const token = uuidv4()
        const response = await db.query("INSERT INTO token_table (user_id, token) VALUES ($1, $2) RETURNING token_id;", [user_id, token])
        const newID = response.rows[0].token_id
        const newToken = await Token.getOneById(newID)
        return newToken
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM token_table WHERE token_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async getOneByToken(token) {
        const response = await db.query("SELECT * FROM token_table WHERE token = $1", [token]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }


    static async getUserByToken(data) {
        const { token } = data;
        const response = await db.query("SELECT users_table.* FROM users_table INNER JOIN token_table ON users_table.user_id = token_table.user_id WHERE token_table.token = $1;", [token]);
        if (response.rows.length == 0) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

}

module.exports = Token;
