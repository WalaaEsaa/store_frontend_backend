import { Product, product_store } from '../../modules/product_rest';
import supertest from 'supertest';
import Client from '../../DBconnection';

const pStore = new product_store();

describe('product Model', () => {
  // if functions found in product modules or not
  describe('product functions defined ', () => {
    it('should have an index method', () => {
      expect(pStore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(pStore.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(pStore.create).toBeDefined();
    });
    it('should have a delete product method', () => {
      expect(pStore.delete).toBeDefined();
    });
    it('should have a update method', () => {
      expect(pStore.updateProduct).toBeDefined();
    });
  });
  
  describe('product  CRUD modules', () => {
   const testProduct={
      product_name: 'eraser',
      price: 10,
      category: 'school'
      } as unknown as Product
      beforeAll(async()=>{
        const createProduct=await pStore.create(testProduct.product_name,testProduct.price,testProduct.category)
        testProduct.id=createProduct.id
      })
      afterAll(async()=>{
        const conn=await Client.connect()
        const sql=`DELETE from products;`
        await conn.query(sql)
        conn.release()
      })
      it('create products should return a new product',async()=>{
        const createuser=await pStore.create('penciel',10,'school' )
        expect(createuser).toEqual({
          id:createuser.id,
          product_name: 'penciel',
          price:10,
         category: 'school',
            }as unknown as Product)
      })
      
      it('get all product data ',async()=>{
        const product=await pStore.index()
        expect(product.length).toBe(2)
      })
      
      it('get one product data ',async()=>{
        const aproduct=await pStore.show(testProduct.id as number)
        expect(aproduct.id).toBe(testProduct.id)
        expect(aproduct.product_name).toBe(testProduct.product_name)
        expect(aproduct.price).toBe(testProduct.price)
        expect(aproduct.category).toBe(testProduct.category)
      })
      
      it('update product',async()=>{
        const updateProduct=await pStore.updateProduct(testProduct.id as number,testProduct.product_name,testProduct.price,testProduct.category)
                         expect(updateProduct.id).toBe(testProduct.id)
         expect(updateProduct.product_name).toBe(testProduct.product_name)
         expect(updateProduct.price).toBe(testProduct.price)
         expect(updateProduct.category).toBe(testProduct.category)
      })
      
      it('delete a product data ',async()=>{
        const deleteproduct=await pStore.delete(testProduct.id as number)
        expect(deleteproduct.id).toBe(testProduct.id)
      })
      

  })
});
