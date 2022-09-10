import express, { Request, Response } from "express"
import { Product, product_store } from "../modules/product_rest";
import jwt, { Secret } from 'jsonwebtoken'

const secretToken = process.env.SECRET_TOKEN as unknown as string
const pStore = new product_store()

const index = async (req: Request, res: Response) => {
    const productAll = await pStore.index()
    res.json(productAll)
}

const show = async (req: Request, res: Response) => {
    const aproduct = await pStore.show(parseInt(req.params.id))
    if (!aproduct) { res.json('this id not found') }
    res.json(aproduct)

}
const deleteProuduct = async (req: Request, res: Response) => {
    const aproduct = await pStore.delete(parseInt(req.params.id))
    res.json(aproduct)

}
const create = async (req: Request, res: Response) => {
    // console.log(req.body)
    try {
        const p_name: string = req.body.product_name
        const price: number = parseInt(req.body.price)
        const category: string = req.body.category

        const newProduct = await pStore.create(p_name, price, category)
        if (newProduct) {
            var token = jwt.sign({ product: newProduct }, secretToken)
            res.json({
                statues: 'sucess',
                data: { ...newProduct, token },
                message: 'create new product'
            })
        } else {
            res.json({
                statues: 'error',
                message: 'can not create new product'
            })
        }
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.delete('/products/:id', deleteProuduct)
}

export default productRoutes

