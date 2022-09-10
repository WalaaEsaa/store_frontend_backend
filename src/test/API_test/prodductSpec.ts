import { Product, product_store } from "../../modules/product_rest"; 
import supertest from 'supertest'
const pStore = new product_store()

describe("product Model", () => {
 // if functions found in product modules or not
 describe("product functions defined ",()=>{
   it('should have an index method', () => {
    expect(pStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(pStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(pStore.create).toBeDefined();
  });
  it('should have a delete user method', () => {
    expect(pStore.delete).toBeDefined();
  });
  it('should have a update method', () => {
    expect(pStore.updateProduct).toBeDefined();
  });
  
})
  
});

