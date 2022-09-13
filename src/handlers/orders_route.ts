import { Orders, Orders_store } from '../modules/order_rest';
import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import verifyAuthToken from '../authmiddelware/authZuser';

dotenv.config();

const oStore = new Orders_store();

const create = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const order = {
       order_status: req.body.order_status,
       user_id: req.body.user_id,
    };
    const newOrder = await oStore.create(order);
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
};
const showOrders = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const orders = await oStore.showCurrentOrders(user_id);
    if (!orders) {
      res.json('error in modules');
    }
    if (orders) {
      res.json({
        status: 'success',
        data: { ...orders },
        message: 'user ordered',
      });
    } else {
      res.json({
        status: 'no order',
        message: 'user not ordered',
      });
    }
  } catch (err) {
    next(err);
  }
};

const getALL = async (req: Request, res: Response,next:NextFunction) => {
  try{
  const orderAll = await oStore.getALL();
  res.json(orderAll);
  }catch(err){
    next(err);
  }
};
const deleteOrder = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const auser = await oStore.deleteOrder(id);
    // if (!auser) {res.json('user id not found ')}
    res.json(`auser deleted`);
  } catch (err) {
    next(err);
  }
};
const updateOrders = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = parseInt(req.params.id);
   const statues = req.body.order_status;
   const user_id = parseInt(req.body.user_id);
     const orderupdate = await oStore.updateOrders(
      id,
      statues,
      user_id
    );
    if (!orderupdate) res.json('errrrrr');
    res.json({
      states: 'succes',
      data: orderupdate,
      message: `auser updated`,
    });
  } catch (err) {
    next(err);
  }
};

const orderRout = (app: Application) => {
  app.get('/orders', getALL);
  //app.get('/orders',verifyAuthToken, getALL);
  app.get('/orders/:user_id', verifyAuthToken, showOrders);
  app.post('/orders',verifyAuthToken, create);
  app.delete('/orders/:id',verifyAuthToken, deleteOrder);
  app.put('/orders/:id',verifyAuthToken, updateOrders);
};
export default orderRout;
