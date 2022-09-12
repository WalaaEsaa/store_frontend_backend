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
  
});
