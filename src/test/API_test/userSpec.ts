import { hashPassword, User, User_Store } from '../../modules/user_rest';
import supertest from 'supertest';
import Client from '../../DBconnection';
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
  describe('users  CRUD modules', () => {
    const testUser = {
      firstname: 'walaa',
      lastname: 'esaa',
      username: 'walaa',
         } as unknown as User
    beforeAll(async () => {
      const createUser = await uStore.create(testUser.firstname, testUser.lastname, testUser.username, testUser.userpassword)
      testUser.id = createUser.id
    })
    afterAll(async () => {
      const conn = await Client.connect()
      const sql = ` DELETE from users;`
      await conn.query(sql)
      conn.release()
    })
    it('create user should return a new user', async () => {

      const createuser = await uStore.create('walaa', 'esaa', 'walaa1', 'walaa')
      expect(createuser.id).toEqual(2)
      expect(createuser.firstname).toEqual('walaa')
      expect(createuser.lastname).toEqual('esaa')
      expect(createuser.username).toEqual('walaa1')
    })

    it('get all user data ', async () => {
      const users = await uStore.index()
      expect(users.length).toBe(2)
    })

    it('get one user data ', async () => {
      const auser = await uStore.show(testUser.id as number)
      
      expect(auser?.id).toBe(testUser.id)
      expect(auser?.firstname).toBe(testUser.firstname)
      expect(auser?.lastname).toBe(testUser.lastname)
      expect(auser?.username).toBe(testUser.firstname)
    })

    it('update user', async () => {
      const updateUser = await uStore.update(1, 'walaa', 'esaa', 'walaa123', 'walaa')
      expect(updateUser?.id).toBe(testUser.id)
      expect(updateUser?.firstname).toBe(testUser.firstname)
      expect(updateUser?.lastname).toBe(testUser.lastname)
      expect(updateUser?.username).toBe('walaa123')
      
    })

    it('delete a user data ', async () => {
      const deleteusers = await uStore.destory(testUser.id as number )
      expect(deleteusers?.id as number).toBe(testUser.id as number)
    })

  })
});
