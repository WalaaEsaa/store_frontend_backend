# store_frontend_backend
 Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.




# run 

 | run | script|
 |-------|--------|
 |main server| npm run start|
 |for prettier| npm run format|
 |for eslint| npm run lint|
 |for migration database|npm run migrate|
 |for jasmine test| npm run test|


## Database Connection

|Data|value|
|------|----------|
|database port|5432|
| driver| pg|
| host |127.0.0.1|
| database|storefront_backend|
|database for test| storefront_backend_test|
| user|walaa|
|password|walaa123|


    


## .env

PORT=5000

POSTGRES_HOST=127.0.0.1

POSTGRES_DB=storefront_backend

POSTGRES_DB_TEST=storefront_backend_test

POSTGRES_USER=walaa

POSTGRES_PASSWORD=walaa123

ENV=dev

SALT_AROUND=10

SECRET_PASSWORD=my_secrert_password

SECRET_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IndhbGFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.2OcbU6PCAPjGympPpBRmUb_G-at0wACIUxLDZ0t_ToY

# main route
 http://localhost:5000


