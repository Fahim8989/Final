CREATE DATABASE trading_test;
USE trading_test;



CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,  
    password VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS user_favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    coin_id VARCHAR(255),
    coin_name VARCHAR(255),
    coin_symbol VARCHAR(255),
    coin_image VARCHAR(255),
    coin_current_price DECIMAL(16, 8), -- Assuming up to 16 total digits with up to 8 decimal places

    FOREIGN KEY (user_id) REFERENCES users(id)
);



  CREATE TABLE IF NOT EXISTS price_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coin_pair VARCHAR(50) NOT NULL,
    target_price DECIMAL(10, 2) NOT NULL,
    user_id INT NOT NULL
  )