import { Orders, Orders_store } from '../../modules/order_rest';
import supertest from 'supertest';
const oStore = new Orders_store();

describe('user Model', () => {
  // if functions found in user modules or not
  describe('orders functions defined ', () => {
    it('should have an crate method', () => {
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
