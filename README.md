# store_frontend_backend
 Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.


# Database

## to connect 
        "driver":"pg",
        "host":"127.0.0.1",
        "database":"storefront_backend",
         "user":"walaa",
        "password":"walaa123"
        
        for test database 
        databse:"storefront_backend_test"
        
        ## to setup databse
        
        npm run migrate
        
        ## port 
        PORT : 4010


# run 
## main server
npm run start 

## for testing
 npm run test


# main route
 http://localhost:4010

 # users route
|CRUD|REST|rout|
 |------|----|--------|
|get all|get |http://localhost:4010/users|
|get one | get |http://localhost:4010/users/:id|
|create |post|http://localhost:4010/users|
|authinticate |post|http://localhost:4010/users/login|
|delete|delete |http://localhost:4010/users/:id|
|update|put |http://localhost:4010/users/:id|

 # product route
 |CRUD|REST|rout|
 |------|----|--------|
|get all|get |http://localhost:4010/products|
|get one | get |http://localhost:4010/products/:id|
|create |post|http://localhost:4010/products|
|delete|delete |http://localhost:4010/products/:id|
|update|put |http://localhost:4010/products/:id|

 # orders route

 |CRUD|REST|rout|
 |------|----|--------|
|get all|get |http://localhost:4010/orders|
|get one | get |http://localhost:4010/orders/:id|
|create |post|http://localhost:4010/orders|
|delete|delete |http://localhost:4010/orders/:id|
|update|put |http://localhost:4010/orders/:id
