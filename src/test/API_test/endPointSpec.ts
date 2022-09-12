import supertest from "supertest";
import app from "../../server";

const request = supertest(app);


describe("test routs", () => {
    it('gets the path of main route', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);

    });
    it('gets the path of users route', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(200);

    });
    it('gets the path of products route', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);

    });    
    it('gets the path of orders route', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(200);

    });
    it('gets the path of order products route', async () => {
        const response = await request.get('/orders_products');
        expect(response.status).toBe(200);

    });

});