const db = require("../database/connect_user")

class Reward {
    constructor({user_id, username, points, admin}){
        this.user_id = user_id;
        this.username =username;
        this.admin = admin;
        this.points = points;
    }
    static async getAll(){
        const response = await db.query("SELECT user_id, username, admin, points FROM users_table")
        if (response.rows.length === 0) {
            throw new Error("Couldn't locate users information.")
        }
        return response.rows.map(g => new Reward(g));
    }
    static async returnPointsById(id){
        const response = await db.query("SELECT username, points, admin FROM users_table WHERE user_id =$1", [id])
        if (response.rows.length!=1){
            throw new Error("Couldn't find account information")
        }
        return new Reward(response.rows[0])
    }
    static async updatePoints(newPoint, id){
        const response = await db.query("UPDATE users_table SET points = $1 WHERE user_id =$2 RETURNING points", [newPoint, id])
        if (response.rows.length!=1){
            throw new Error("Update was unsuccessful")
        }
        return new Reward(response.rows[0])
    }
    static async resetPoints(id){
        const response = await db.query("UPDATE users_table SET points = 0 WHERE user_id =$1 RETURNING points", [id])
        if (response.rows.length!=1){
            throw new Error("Update was unsuccessful")
        }
        return new Reward(response.rows[0])        
    }
}
module.exports = Reward;