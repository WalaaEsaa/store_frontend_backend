import { Orders, Orders_store } from '../modules/order_rest'
import express, { Application, NextFunction, Request, Response } from "express"
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secretToken = process.env.SECRET_TOKEN as Secret
const oStore = new Orders_store

const create = async (req: Request, res: Response) => {
    try {
        const order = {
            quantity: req.body.product_quantity,
            statuse: req.body.order_status,
            product_id: req.body.product_id,
            user_id: req.body.user_id
                     
        }
        console.log(order)
        const newOrder = await oStore.create(order)
        res.json(newOrder)
    } catch (err) {
        res.json(err)
    }
}
const showOrders = async (req: Request, res: Response) => {
    try {
        const user_id = parseInt(req.body.user_id)
        console.log(user_id)
        const orders = await oStore.showCurrentOrders(user_id)
        if (!orders) { res.json('error in modules') }
        console.log(orders)
        var token = jwt.sign({ order: orders }, secretToken)
        if (orders) {
            res.json({
                status: 'success',
                data: { ...orders, token },
                message: 'user ordered'
            })
        } else {
            res.json({
                status: 'no order',

                message: 'user not ordered'
            })
        }
    } catch (err) {
        res.status(401) //unautherize
        res.json(err)
    }
}
const orderRout = (app: Application) => {
    app.get('/orders', showOrders)
    app.post('/orders', create)
}
export default orderRout