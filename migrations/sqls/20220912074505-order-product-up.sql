/* Replace with your SQL commands */

CREATE TABLE orders_products(
order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE ,
product_id INTEGER REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
product_quantity INTEGER,
PRIMARY KEY(order_id,product_id)
);