import Client from '../DBconnection';
import bcrypt from 'bcrypt';

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
const saltRound = process.env.SALT_AROUND as string;
const pepper = process.env.SECRET_PASSWORD;

export const hashPassword = (password: string) => {
  const salt = parseInt(saltRound, 10);
  return bcrypt.hashSync(`${password}${pepper}`, salt);
};

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  userpassword: string;
};

export class User_Store {
  async create(
    firstname: string,
    lastname: string,
    username: string,
    userpassword: string): Promise<User> {
    try {
      const sql = `INSERT INTO users (firstname,lastname,username,userpassword) 
      VALUES($1,$2,$3,$4) RETURNING firstname,lastname,username`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        firstname,
       lastname,
        username,
        hashPassword(userpassword),
      ]);
     // console.log(hashPassword(userpassword));
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`can not insert new user ${err}`);
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT userpassword FROM users WHERE username=($1)';
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(`${password}${pepper}`, user.userpassword)) {
        return user;
      }
    }

    return null;
  }

  async index(): Promise<User[]> {
    try {
      const sql = `SELECT firstname,lastname,username FROM users`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      const user = result.rows;
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`can not show suer ${err}`);
    }
  }

  async show(id: number): Promise<User | null> {
    try {
      const sql =
        `SELECT id,firstname,lastname,username FROM  users WHERE id=($1)`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`can not show a spesific user ${err}`);
    }
  }

  async destory(id: number): Promise<User | null> {
    try {
      const sql = `DELETE FROM  users WHERE id=($1) 
      RETURNING firstname,lastname,username`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`can not deleted a spesific user ${err}`);
    }
  }
  async update(
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    password: string
  ): Promise<User | null> {
    try {
      const sql = `UPDATE users SET 
            id=($1),  
            firstname=($2),
             lastname=($3),
             username=($4), 
             userpassword=($5)
             WHERE id=($1) 
             RETURNING firstname,lastname,username`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        id,
        firstName,
        lastName,
        userName,
        hashPassword(password),
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`can not update a spesific user ${err}`);
    }
  }
}

