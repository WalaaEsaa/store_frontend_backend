/* Replace with your SQL commands */
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    userName VARCHAR(100) UNIQUE ,
    userPassword VARCHAR(150)
);