/*
Index
Show
Create [token required]
[OPTIONAL] Top 5 most popular products
[OPTIONAL] Products by category (args: product category)*/

import Client from '../DBconnection';

//product object
export type Product = {
  id?: number;
  product_name: string;
  price: number;
  product_category: string;
};

//product class
export class product_store {
  async create(
    product_name: string,
    price: number,
    product_category: string
  ): Promise<Product> {
    try {
      const sql = `INSERT INTO products
            (product_name, price , category ) 
            VALUES ($1,$2,$3) RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [product_name, price, product_category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`can not insert new product ${err}`);
    }
  }
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products';
      const conn = await Client.connect();
      const result = await conn.query(sql);
      const product = result.rows;
      conn.release;
      return product;
    } catch (err) {
      throw new Error(`can not show products information ${err}`);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const sql = `SELECT * FROM products WHERE id=$1`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`can not show product of id = ${id} : ${err}`);
    }
  }
  async delete(id: number): Promise<Product> {
    try {
      const sql = `DELETE FROM products WHERE id=($1) RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`can not show product of id = ${id} : ${err}`);
    }
  }
  async updateProduct(
    pID: number,
    p_name: string,
    price: number,
    category: string
  ): Promise<Product> {
    try {
      const sql = `UPDATE products SET 
            id=($1),
            product_name=($2),
            price=($3),
            category=($4) 
            WHERE id=($1) 
            RETURNING *`;

      const conn = await Client.connect();
      const result = await conn.query(sql, [pID, p_name, price, category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`can not show product of id = ${pID} : ${err}`);
    }
  }
}
