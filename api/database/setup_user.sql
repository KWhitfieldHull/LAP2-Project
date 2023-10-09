DROP TABLE IF EXISTS items_table;
DROP TABLE IF EXISTS token_table;
DROP TABLE IF EXISTS users_table;

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
    category VARCHAR(200) NULL,
    user_id INT NOT NULL, 
    image_url VARCHAR(100),
    description VARCHAR (500) NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (user_id) REFERENCES users_table("user_id")
);

INSERT INTO items_table (name, category, user_id, image_url, description) VALUES 
    ('Camera', 'Electronics', 1, 'google.com/images', 'a very cool camera for sale'),
    ('Football', 'Sports', 1, 'google.com/images', 'a very cool football for sale'),
    ('Laptop', 'Electronics', 1, 'google.com/images/laptop', 'a very cool laptop for sale'),
    ('Camera', 'Electronics', 1, 'google.com/images', 'a very cool camera for sale');

INSERT INTO users_table (username, password, address, admin, points) VALUES 
('testname', 'notencryptedyet', '123 Real Street', FALSE, 12),
('testname2', 'notencryptedyet', '456 Fake Street', TRUE, 1000000);