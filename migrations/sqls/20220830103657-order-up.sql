/* Replace with your SQL commands */
CREATE TYPE statue AS ENUM ('active' , 'complete');
CREATE TABLE orders(
id SERIAL PRIMARY KEY,
product_quantity INTEGER,
order_status statue,
product_id INTEGER REFERENCES products(id) ,
user_id INTEGER REFERENCES users(id)
);