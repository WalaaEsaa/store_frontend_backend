import { User, User_Store } from '../../modules/user_rest';
import supertest from 'supertest';
const uStore = new User_Store();

describe('user Model', () => {
  // if functions found in user modules or not
  describe('users functions defined ', () => {
    it('should have an index method', () => {
      expect(uStore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(uStore.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(uStore.create).toBeDefined();
    });
    it('should have a delete user method', () => {
      expect(uStore.destory).toBeDefined();
    });
    it('should have a log in method', () => {
      expect(uStore.authenticate).toBeDefined();
    });
    it('should have a update method', () => {
      expect(uStore.update).toBeDefined();
    });
  });
});
