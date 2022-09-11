import express, { Request, Response } from 'express';
import { Product, product_store } from '../modules/product_rest';
import jwt, { Secret } from 'jsonwebtoken';
import verifyAuthToken from '../authmiddelware/authZuser';

const secretToken = process.env.SECRET_TOKEN as unknown as string;
const pStore = new product_store();

const create = async (req: Request, res: Response) => {
  // console.log(req.body)
  try {
    const p_name: string = req.body.product_name;
    const price: number = parseInt(req.body.price);
    const category: string = req.body.category;

    const newProduct = await pStore.create(p_name, price, category);
   // console.log(newProduct);
    res.json(newProduct);
    /* //if (newProduct) {
           // var token = jwt.sign({ product: newProduct }, secretToken)
            res.json({
                statues: 'sucess',
                data: newProduct ,
                message: 'create new product'
            })
      } else {
            res.json({
                statues: 'error',
                message: 'can not create new product'
            })
        }*/
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const index = async (req: Request, res: Response) => {
  const productAll = await pStore.index();
  res.json(productAll);
};

const show = async (req: Request, res: Response) => {
  const aproduct = await pStore.show(parseInt(req.params.id));
  if (!aproduct) {
    res.json('this id not found');
  }
  res.json(aproduct);
};
const deleteProuduct = async (req: Request, res: Response) => {
  const aproduct = await pStore.delete(parseInt(req.params.id));
  if (!aproduct) {
    res.json('this id not found');
  }
  res.json(aproduct);
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const pid: number = parseInt(req.params.id);
    const p_name: string = req.body.product_name;
    const price: number = parseInt(req.body.price);
    const category: string = req.body.category;
    const aproduct = await pStore.updateProduct(pid, p_name, price, category);
    res.json(aproduct);
  } catch (err) {
    throw new Error(`can not show product of : ${err}`);
  }
};

const productRoutes = (app: express.Application) => {
  app.post('/products', create);
  // app.post('/products',verifyAuthToken, create)
  app.get('/products', index);
  app.get('/products/:id', show);
  app.delete('/products/:id', deleteProuduct);
  app.put('/products/:id', updateProduct);
};

export default productRoutes;
