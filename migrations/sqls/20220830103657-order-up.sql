/* Replace with your SQL commands */
CREATE TYPE statue AS ENUM ('active' , 'complete');
CREATE TABLE orders(
id SERIAL PRIMARY KEY,
order_status statue,
user_id INTEGER REFERENCES users(id)
);