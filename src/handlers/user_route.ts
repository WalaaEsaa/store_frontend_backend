import express, { NextFunction, Request, Response } from "express"
import jwt, { Secret } from 'jsonwebtoken'
import { User, User_Store } from "../modules/user_rest";
import dotenv from 'dotenv'
dotenv.config()

const secretToken = process.env.SECRET_TOKEN as unknown as string
const uStore = new User_Store()


const create = async (req: Request, res: Response) => {

    try {
        const user: User = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            userName: req.body.username,
            password: req.body.userpassword
        }
        const newUser = await uStore.create(user)
        console.log(newUser)
        if (!newUser) { res.json('data exit or error in data') }
        res.json(newUser)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const authenticate = async (req: Request, res: Response) => {
    try {
        const username = req.body.username
        const password = req.body.userpassword
        const user = await uStore.authenticate(username, password)
        var token = jwt.sign({ user: user }, secretToken);
        // res.json(token)
        if (!user) {
            res.status(401)
            res.json('user un authinticate')
        }
        res.json({
            status: 'success',
            data: { ...user, token },
            message: 'user authintication'
        })
    } catch (error) {
        res.status(401)
        res.json({ error })
    }
}

const index = async (req: Request, res: Response) => {
    const userAll = await uStore.index()
    res.json(userAll)
}

const show = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const auser = await uStore.show(id)
        if (!auser) { res.json('user id not found ') }
        res.json(auser)

    } catch (err) {
        res.json(err)
    }
}
const destory = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const auser = await uStore.destory(id)
        // if (!auser) {res.json('user id not found ')}
        res.json(`auser deleted`)

    } catch (err) {
        res.json(err)
    }
}
const update = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: parseInt(req.params.id),
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            userName: req.body.username,
            password: req.body.userpassword
        }
        const auser = await uStore.update(user)
        console.log(auser)
        res.json({
            states: 'succes',
            data: auser,
            message: `auser updated`
        })

    } catch (err) {
        res.json(err)
    }
}
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authzHeader = req.headers.authorization as string || ' '
        // console.log('auth ' + authzHeader)
        const token = authzHeader.split(' ')[1]
        // console.log('token: ' + token)
        //  console.log('secretToken: ' + secretToken)
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const verified = jwt.verify(token, secretToken)
        req.body = verified;
        // console.log(verified)
        next()
    } catch (err) {
        res.status(401)
        res.json(`token requir ${err}`)
    }
}
const userRoutes = (app: express.Application) => {
    app.post('/users', create)
    app.post('/users/login', authenticate)
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.delete('/users/:id', verifyAuthToken, destory)
    app.put('/users/:id', verifyAuthToken, update)

    //app.post('/users', create)
}
export default userRoutes
