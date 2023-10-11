DROP TABLE IF EXISTS items_table;
DROP TABLE IF EXISTS token_table;
DROP TABLE IF EXISTS users_table;
DROP TABLE IF EXISTS categories_table;

CREATE TABLE categories_table (
    category_id INT GENERATED ALWAYS AS IDENTITY,
    category VARCHAR (100) NOT NULL,
    PRIMARY KEY (category_id)
);
CREATE TABLE users_table (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    address VARCHAR(255) NULL, 
    admin BOOLEAN DEFAULT FALSE NOT NULL, 
    points INT DEFAULT 0 NOT NULL,
    PRIMARY KEY (user_id)
);
CREATE TABLE token_table (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users_table("user_id")
);

CREATE TABLE items_table (
    item_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (100) NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL, 
    image_url VARCHAR(65000),
    description VARCHAR (500) NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (user_id) REFERENCES users_table("user_id"),
    FOREIGN KEY (category_id) REFERENCES categories_table("category_id")
);
CREATE TABLE bids_table(
    bid_id INT GENERATED ALWAYS AS IDENTITY, 
    user_id INT NOT NULL, 
    item_id INT UNIQUE NOT NULL,
    highest_bid INT NOT NULL, 
    PRIMARY KEY(bid_id), 
    FOREIGN KEY (item_id) REFERENCES items_table("item_id"), 
    FOREIGN KEY (user_id) REFERENCES users_table("user_id")
);

INSERT INTO categories_table (category) VALUES
    ('Glass'),
    ('Metal'),
    ('Paper');


INSERT INTO users_table (username, password, address, admin, points) VALUES 
('testname', 'notencryptedyet', '123 Real Street', FALSE, 12),
('testname2', 'notencryptedyet', '456 Fake Street', TRUE, 1000000);


INSERT INTO items_table (name, category_id, user_id, image_url, description) VALUES 
    ('Bottle', 1, 1, 'google.com/images', 'a very cool camera for sale'),
    ('Glass item', 1, 1, 'google.com/images', 'a very cool football for sale'),
    ('Metal item', 2, 1, 'google.com/images/laptop', 'a very cool laptop for sale'),
    ('Paper item', 3, 1, 'google.com/images', 'a very cool camera for sale');

INSERT INTO bids_table(user_id, item_id, highest_bid) VALUES
(1, 1, 500), 
(2,2,30);


