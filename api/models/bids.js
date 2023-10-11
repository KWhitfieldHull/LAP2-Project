const db = require("../database/connect_user")

class Bid {
    constructor(data) {
        this.id = data.bid_id
        this.user_id = data.user_id
        this.item_id = data.item_id
        this.highest_bid = data.highest_bid
    }

    static async getAllBids() {
        const response = await db.query("SELECT * FROM bids_table")
        if (response.rows.length === 0) {
            throw new Error("no bids found!")
        }
        return response.rows.map(b => new Bid(b));
    }
    static async getBidById(bid_id) {
        const response = await db.query("SELECT * FROM bids_table WHERE bid_id = $1;", [bid_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate bid.")
        }
        return new Bid(response.rows[0]);
    }
    static async getBidByItemId(item_id) {
        console.log("Second log")
        const response = await db.query("SELECT * FROM bids_table WHERE item_id = $1;", [item_id]);
        if (response.rows.length === 0) {
            return -1
        }
        return new Bid(response.rows[0]);
    }
    static async getBidByUserId(user_id) {
        const response = await db.query("SELECT * FROM bids_table WHERE user_id = $1;", [user_id]);
        if (response.rows.length === 0) {
            return -1
        }
        return response.rows.map(b => new Bid(b));
    }
    static async createBid(user_id, item_id, highest_bid) {
        const response = await db.query('INSERT INTO bids_table (user_id, item_id, highest_bid) VALUES ($1, $2, $3) RETURNING *;', [user_id, item_id, highest_bid]);
        return response.rows[0]
    }
    static async updateBid(user_id, item_id, highest_bid) {
        const response = await db.query("UPDATE bids_table SET user_id =$1, highest_bid=$2 WHERE item_id = $3 RETURNING *;", [user_id, highest_bid, item_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update item")
        }
        return new Bid(response.rows[0]);   
    }
    async deleteBid(item_id) {
        const response = await db.query("DELETE FROM bids_table WHERE item_id = $1 RETURNING *", [item_id])
        if (response.rows.length != 1) {
            throw new Error("Unable to delete item.")
        }
        return new Bid(response.rows[0]);
}
    

}
module.exports = Bid;
