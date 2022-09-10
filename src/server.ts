import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import productRoutes from './handlers/product_route'
import bodyParser from 'body-parser'
import userRoutes from './handlers/user_route'
import orderRout from './handlers/orders_route'

dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 5000

app.get('', (req: Request, res: Response) => {
    res.json('server for my company ')
})

userRoutes(app)
productRoutes(app)
orderRout(app)
app.listen(port, () => {
    console.log(`company server run on : http://localhost:${port}`)
})
