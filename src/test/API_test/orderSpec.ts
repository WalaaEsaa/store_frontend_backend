import { Orders, Orders_store } from '../../modules/order_rest';
import supertest from 'supertest';
import Client from '../../DBconnection';
import { User, User_Store } from '../../modules/user_rest';
import { Product, product_store } from '../../modules/product_rest';
const oStore = new Orders_store();
const uStore = new User_Store();
const pStore = new product_store();
describe('orders Model', () => {
  // if functions found in user modules or not
  describe('orders functions defined ', () => {
    it('should have an create method', () => {
      expect(oStore.create).toBeDefined();
    });

    it('should have a get all order method', () => {
      expect(oStore.getALL).toBeDefined();
    });

    it('should have a delete order method', () => {
      expect(oStore.deleteOrder).toBeDefined();
    });
    it('should have a show  order method', () => {
      expect(oStore.showCurrentOrders).toBeDefined();
    });
    it('should have a update order method', () => {
      expect(oStore.updateOrders).toBeDefined();
    });
  });
  describe('order  CRUD modules', () => {
    const testOrder = {
      quantity: 5,
      statuse: 'complete',
      product_id: 1,
      user_id: 1
    } as unknown as Orders
      
    beforeAll(async () => {
        const createOrder = await oStore.create(testOrder)
      testOrder.id = createOrder.id
    })
    afterAll(async () => {
      const conn = await Client.connect()
      const sql = `DELETE from orders;`
      await conn.query(sql)
      conn.release()
    })
    it('create order should return a new order', async () => {
      const createOrder = await oStore.create({
        product_quantity: 5,
        order_status: 'complete',
        product_id: 1,
        user_id: 1
      })
      expect(createOrder).toEqual({
        id: createOrder.id,
        product_quantity: 5,
        order_status: 'complete',
        product_id: 1,
        user_id: 1
      })
    })

    it('get all order data ', async () => {
      const orders = await oStore.getALL()
      expect(orders.length).toBe(1)
    })

    it('get orders of an user  ', async () => {
      const anorder = await oStore.showCurrentOrders(testOrder.user_id as number)
      expect(anorder?.length).toBe(0)
    })

    it('update order', async () => {
      const updateOrder = await oStore.updateOrders
        (testOrder.id as number,
          testOrder.product_quantity,
          testOrder.order_status,
          testOrder.product_id,
          testOrder.user_id)
      expect(updateOrder.id).toBe(testOrder.id)
      expect(updateOrder.product_quantity).toBe(testOrder.product_quantity)
      expect(updateOrder.order_status).toBe(testOrder.order_status)
     expect(updateOrder.product_id).toBe(testOrder.product_id)
      expect(updateOrder.user_id).toBe(testOrder.user_id)
    })

    it('delete an order data ', async () => {
      const deleteorder = await oStore.deleteOrder(testOrder.id as number)
      expect(deleteorder.id).toBe(testOrder.id)
    })


  })
});
