<<<<<<< HEAD
 
 
# main route
 http://localhost:4010
=======
>>>>>>> 17ef0fa377a14f5f1dea540a76d084d80d11dea6

 # users route
|CRUD|REST|rout|
 |------|----|--------|
|get all|get |http://localhost:4010/users|
|get one | get |http://localhost:4010/users/:id|
|create |post|http://localhost:4010/users|
|authinticate |post|http://localhost:4010/users/login|
|delete|delete |http://localhost:4010/users/:id|
|update|patch |http://localhost:4010/users/:id|

 # product route
 |CRUD|REST|rout|
 |------|----|--------|
|get all|get |http://localhost:4010/products|
|get one | get |http://localhost:4010/products/:id|
|create |post|http://localhost:4010/products|
|delete|delete |http://localhost:4010/products/:id|
|update|patch |http://localhost:4010/products/:id|

 # orders route

 |CRUD|REST|rout|
 |------|----|--------|
|get all|get |http://localhost:4010/orders|
|get one | get |http://localhost:4010/orders/:id|
|create |post|http://localhost:4010/orders|
|delete|delete |http://localhost:4010/orders/:id|
|update|put |http://localhost:4010/orders/:id

<<<<<<< HEAD
## Database schema

![This is ER image](https://github.com/WalaaEsaa/stor_fronend_backend/blob/main/screenshot/er_schema.JPG)

## product table

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price INTEGER,
   category VARCHAR(100) 
);

## users table

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    userName VARCHAR(100) UNIQUE ,
    userPassword VARCHAR(150)
);

## order tables

CREATE TYPE statue AS ENUM ('active' , 'complete');
CREATE TABLE orders(
id SERIAL PRIMARY KEY,
product_quantity INTEGER,
order_status statue,
product_id INTEGER REFERENCES products(id),
user_id INTEGER REFERENCES users(id)
);
=======
>>>>>>> 17ef0fa377a14f5f1dea540a76d084d80d11dea6
