const db = require('../database/connect_user');

class User {

    constructor({ user_id, username, password, is_admin, address }) {
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.isAdmin = is_admin;
        this.address = address;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM users_table WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM users_table WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password, isAdmin } = data;
        let response = await db.query("INSERT INTO users_table (username, password) VALUES ($1, $2) RETURNING user_id;",
            [username, password]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }


    async update(data) {
        let { username, password, address } = data;
 
        if (username == '') {
            username = this.username;
        }
        if (password == '') {
            password = this.password;
        } 
        if (address == '') {
            address = this.address;
            
            
        }
        const response = await db.query("UPDATE users_table SET username = $1, password = $2, address = $3 WHERE user_id = $4 RETURNING *;",
            [ username, password, address, this.id ]);


        
        if (response.rows.length != 1) {
            throw new Error("Unable to update User.")
        }
        return new User(response.rows[0]);
    }

    
}

module.exports = User;