import express, { NextFunction, Request, Response } from 'express';
import { Product, product_store } from '../modules/product_rest';
import verifyAuthToken from '../authmiddelware/authZuser';

const secretToken = process.env.SECRET_TOKEN as unknown as string;
const pStore = new product_store();

const create = async (req: Request, res: Response,next:NextFunction) => {
  // console.log(req.body)
  try {
    const product_name: string = req.body.product_name;
    const price: number = parseInt(req.body.price);
    const category: string = req.body.category;
    const newProduct = await pStore.create(product_name, price, category);
   // console.log(newProduct);
    res.json(newProduct);
     } catch (err) {
      next(err);
  }
};
const index = async (req: Request, res: Response,next:NextFunction) => {
  try{
  const productAll = await pStore.index();
  res.json(productAll);
  }catch(err){
    next(err);
  }
};

const show = async (req: Request, res: Response,next:NextFunction) => {
 try{
  const aproduct = await pStore.show(parseInt(req.params.id));
  if (!aproduct) {
    res.json('this id not found');
  }
  res.json(aproduct);
}catch(err){
  next(err);
  }
};
const deleteProuduct = async (req: Request, res: Response,next:NextFunction) => {
  
  try{
    const aproduct = await pStore.delete(parseInt(req.params.id));
  if (!aproduct) {
    res.json('this id not found');
  }
  res.json(aproduct);
}catch(err){
  next(err);
}
};
const updateProduct = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const pid: number = parseInt(req.params.id);
    const product_name: string = req.body.product_name;
    const price: number = parseInt(req.body.price);
    const category: string = req.body.category;
    const aproduct = await pStore.updateProduct(pid, product_name, price, category);
    res.json(aproduct);
  } catch (err) {
    throw new Error(`can not show product of : ${err}`);
  }
};

const productRoutes = (app: express.Application) => {
  app.post('/products',verifyAuthToken, create);
   app.get('/products', index);
  app.get('/products/:id', show);
  app.delete('/products/:id', deleteProuduct);
  app.put('/products/:id', updateProduct);
};

export default productRoutes;
