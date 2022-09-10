import express, { NextFunction, Request, Response } from "express"
import jwt, { Secret } from 'jsonwebtoken'
import { User, User_Store } from "../modules/user_rest";
import dotenv from 'dotenv'
dotenv.config()

const secretToken = process.env.SECRET_TOKEN as unknown as string 
const uStore = new User_Store()

const authenticate = async (req: Request, res: Response) => {
    try {
        const username = req.body.username
        const password = req.body.userpassword
        const u = await uStore.authenticate(username, password)
        var token = jwt.sign({ user: u }, secretToken);
        res.json(token)
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
        const username = req.body.username
        const password = req.body.userpassword
        const auser = await uStore.show(username, password)
         console.log(auser)
        var token = jwt.sign({ user: auser }, secretToken)
        if (!auser) {
            res.status(401)
            res.json('user un authinticate')
        }
        res.json({
            status: 'success',
            data: { ...auser, token },
            message: 'user authintication'
        })

    } catch (err) {
        res.status(401) //unautherize
        res.json(err)
    }
}
     
const create = async (req: Request, res: Response) => {
    // console.log(req.body)
    try {
        const user: User = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            userName: req.body.username,
            password: req.body.userpassword
        }
        const newUser = await uStore.create(user)
      //  var token = jwt.sign({ user: newUser }, secretToken)
      //  console.log('token: ' + token)
        res.json(newUser)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authzHeader = req.headers.authorization as string || ' '
        console.log('auth '+authzHeader)
        const token = authzHeader.split(' ')[1]
        console.log('token: ' + token)
        console.log('secretToken: ' + secretToken)
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const verified = jwt.verify(token, secretToken)
        req.body = verified;
        console.log(verified)
        next()
    } catch (err) {
        res.status(401)
        res.json(`token requir ${err}`)
    }
}
const userRoutes = (app: express.Application) => {
    app.post('/users/login',verifyAuthToken,authenticate)
    app.get('/users', verifyAuthToken,index)
    app.get('/users/:id', show)
     app.post('/users', create)
    //app.post('/users', create)
}
export default userRoutes
