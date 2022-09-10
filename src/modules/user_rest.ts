import Client from "../DBconnection"
import bcrypt from 'bcrypt'

/*
Users
Index [token required]
Show [token required]
Create N[token required]

id
firstName
lastName
password
*/
const saltRound=process.env.SALT_AROUND as string
const pepper=process.env.SECRET_PASSWORD

const hashPassword=(password:string)=>{
    const salt=parseInt(saltRound ,10)
    return bcrypt.hashSync(`${password}${pepper}`,salt)
}

export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    userName:string,
    password: string
}


export class User_Store{

    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT userpassword FROM users WHERE username=($1)'

        const result = await conn.query(sql, [username])
       // console.log(password + pepper)
        if (result.rows.length) {
           const user = result.rows[0]
            //console.log(user)
            if (bcrypt.compareSync(`${password}${pepper}` , user.userpassword)) {
                return user
            }
        }

        return null
    }


    async index():Promise<User[]>{
        try{
        const sql="SELECT firstname,lastname,username FROM users"
        const conn= await Client.connect()
        const result= await conn.query(sql)
        const user=result.rows
        conn.release()
        return user
        }catch(err){
            throw new Error(`can not show suer ${err}`)
        }
    }

    async show(username:string,password:string):Promise<User|null>{
        
        try{
            const sql="SELECT firstname,lastname,username,userpassword FROM  users WHERE username=($1)"
        const conn=await Client.connect()
        const result=await conn.query(sql,[username])
        if(result.rows.length){
            const user=result.rows[0]
           // console.log('ssss '+user.userpassword)
            if(bcrypt.compareSync(`${password}${pepper}`, user.userpassword)){
                return user
            }
        }
                conn.release()
        return null
    }catch(err){
        throw new Error(`can not show a spesific user ${err}`)
    }
    }
    async create(u:User):Promise<User>{
        try{
        const sql=`INSERT INTO users (firstname,lastname,username,userpassword) VALUES($1,$2,$3,$4)`
        const conn=await Client.connect()
        const result=await conn.query(sql,[u.firstName,u.lastName,u.userName,hashPassword(u.password)])
        console.log(hashPassword(u.password))
        const user=result.rows[0]
        conn.release()
        return user
    }catch(err){
        throw new Error(`can not insert new user ${err}`)
    }
    }


}