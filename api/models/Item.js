const db = require("../database/connect_user")

class Item {
    constructor(data) {
        this.id = data.item_id;
        this.name = data.name;
        this.category_id = data.category_id;
        this.category = data.category;
        this.user_id = data.user_id;
        this.image_url = data.image_url;
        this.description = data.description;
        this.bid_expires = data.bid_expires;
    }

    static async getAll() {
        const response = await db.query("SELECT i.item_id, i.name, c.category, i.user_id, i.image_url, i.description FROM items_table AS i JOIN categories_table AS c ON c.category_id = i.category_id ORDER BY i.item_id");
        if (response.rows.length === 0) {
            throw new Error("No items available.")
        }
        return response.rows.map(g => new Item(g));
    }
    static async getBidExpireByItemId(item_id){
        const response = await db.query("SELECT bid_expires FROM items_table WHERE item_id =$1;", [item_id])
        if (response.rows.length === 0){
            throw new Error("Couldn't locate the item!")
        }
        return response.rows[0]
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM items_table WHERE item_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate item.")
        }

        return new Item(response.rows[0]);
    }


    static async getOneByUserId(id) {
        const response = await db.query("SELECT * FROM items_table WHERE user_id = $1;", [id]);
        if (response.rows.length === 0) {
            throw new Error("No items available.")
        }
        return response.rows.map(g => new Item(g));
    }

    static async getOneByCategory(category) {
        const response = await db.query("SELECT * FROM items_table WHERE category_id = $1;", [category]);
        if (response.rows.length === 0) {
            throw new Error("No items available.")
        }
        return response.rows.map(g => new Item(g));
    }

    static async create(data) {
        const { name, user_id, image_url, description, category } = data;
        const response = await db.query("INSERT INTO items_table (name, user_id, image_url, description, category_id, bid_expires) VALUES ($1, $2, $3 ,$4, $5, NOW() + INTERVAL '5 days') RETURNING *;", [name, user_id, image_url, description, category]);
        const item_id = response.rows[0].item_id
        console.log(response.rows[0])
        const bid = await db.query("INSERT INTO bids_table (user_id, item_id, highest_bid) VALUES ($1,$2,$3)", [user_id, item_id, 0])
        console.log(`Bid created`)
        
        return [response.rows[0]]
    }

    static async updateItem(data, id) {
        const { name, user_id, image_url, description, category } = data;
        const response = await db.query("UPDATE items_table SET name = $1, user_id =$2, image_url =$3, description =$4, category_id =$5 WHERE item_id = $6 RETURNING *;",
            [name, user_id, image_url, description, category, id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update item")
        }
        return new Item(response.rows[0]);
    }

    async destroy(id) {
        const bidDelete = await db.query("DELETE FROM bids_table WHERE item_id = $1 RETURNING *;", [id]);
        const response = await db.query("DELETE FROM items_table WHERE item_id = $1 RETURNING *;", [id]);
        if (bidDelete.rows.length != 1) {
            throw new Error("Unable to delete item from bids table.")
        }
        if (response.rows.length != 1) {
            throw new Error("Unable to delete item from items table.")
        }
        return new Item(response.rows[0]);
    }
}

module.exports = Item;
