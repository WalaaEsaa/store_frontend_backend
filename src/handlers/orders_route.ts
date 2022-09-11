import { Orders, Orders_store } from '../modules/order_rest';
import express, { Application, NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../authmiddelware/authZuser';

dotenv.config();

const secretToken = process.env.SECRET_TOKEN as Secret;
const oStore = new Orders_store();

const create = async (req: Request, res: Response) => {
  try {
    const order = {
      product_quantity: req.body.product_quantity,
      order_status: req.body.order_status,
      product_id: req.body.product_id,
      user_id: req.body.user_id,
    };
    //console.log(order);
    const newOrder = await oStore.create(order);
    res.json(newOrder);
  } catch (err) {
    res.json(err);
  }
};
const showOrders = async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.user_id);
    // console.log(user_id)
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
    res.status(401); //unautherize
    res.json(err);
  }
};

const getALL = async (req: Request, res: Response) => {
  const orderAll = await oStore.getALL();
  res.json(orderAll);
};
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const auser = await oStore.deleteOrder(id);
    // if (!auser) {res.json('user id not found ')}
    res.json(`auser deleted`);
  } catch (err) {
    res.json(err);
  }
};
const updateOrders = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const quantity = parseInt(req.body.product_quantity);
    const statues = req.body.order_status;
    const product_id = parseInt(req.body.product_id);
    const user_id = parseInt(req.body.user_id);
    //console.log(id,quantity,statues,product_id,user_id)
    const orderupdate = await oStore.updateOrders(
      id,
      quantity,
      statues,
      product_id,
      user_id
    );
   // console.log(orderupdate);
    if (!orderupdate) res.json('errrrrr');
    res.json({
      states: 'succes',
      data: orderupdate,
      message: `auser updated`,
    });
  } catch (err) {
    res.json(err);
  }
};

const orderRout = (app: Application) => {
  app.get('/orders/', getALL);
  app.get('/orders/:user_id', verifyAuthToken, showOrders);
  app.post('/orders', create);
  app.delete('/orders/:id', deleteOrder);
  app.put('/orders/:id', updateOrders);
};
export default orderRout;
