import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import verifyAuthToken from '../authmiddelware/authZuser';
import { OrdersProducts, OrdersProduct_store } from '../modules/order_product';

dotenv.config();

const opStore = new OrdersProduct_store();

const create = async (req: Request, res: Response) => {
    try {
        const order_product = {
            product_id: req.body.product_id,
            order_id: req.body.user_id,
            product_quantity: req.body.product_quantity,
        };
        const newOrder = await opStore.create(order_product);
        res.json(newOrder);
    } catch (err) {
        res.json(err);
    }
};
const showOrder = async (req: Request, res: Response) => {
    try {
        const order_id = parseInt(req.params.order_id);
        // console.log(user_id)
        const orders = await opStore.showOrder(order_id);
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
        res.status(401);
        res.json(err);
    }
};

const getALL = async (req: Request, res: Response) => {
    const orderAll = await opStore.getALL();
    res.json(orderAll);
};

const updateQuantity = async (req: Request, res: Response) => {
    try {
        const order_id = parseInt(req.params.order_id);
        const product_id = parseInt(req.params.product_id);
        const product_quantity = parseInt(req.body.product_quantity);

        const orderupdate = await opStore.updateQuantity(
            product_quantity,
            order_id,
            product_id
           
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

const orderProductRout = (app: Application) => {
    app.get('/orders_products/',verifyAuthToken, getALL);
    app.get('/orders_products/:order_id',verifyAuthToken, showOrder);
    app.post('/orders_products',verifyAuthToken, create);
    app.put('/orders_products/:order_id',verifyAuthToken, updateQuantity);
};
export default orderProductRout;
