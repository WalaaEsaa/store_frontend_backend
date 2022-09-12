import Client from '../DBconnection';

export type Orders = {
  id?: number;
  order_status: string;
   user_id: number;
};

export class Orders_store {
  async create(order: Orders): Promise<Orders> {
    const sql = `INSERT INTO orders(order_status,user_id) 
    VALUES ($1,$2)  RETURNING *`;
 
    const conn = await Client.connect();
    const result = await conn.query(sql, [
      order.order_status,
       order.user_id,
    ]);
    const ordern = result.rows[0];
    conn.release();
    return ordern;
  }

  async showCurrentOrders(user_id: number): Promise<Orders[] | null> {
    const sql = `SELECT order_status, user_id
     FROM orders INNER JOIN users  ON orders.user_id=users.id 
      WHERE orders.user_id=($1)`;
    const conn = await Client.connect();
    const result = await conn.query(sql, [user_id]);
    const order = result.rows;
    conn.release();
    return order;
  }
  async getALL(): Promise<Orders[]> {
    try {
      const sql = 'SELECT * FROM orders';
      const conn = await Client.connect();
      const result = await conn.query(sql);
      const product = result.rows;
      conn.release;
      return product;
    } catch (err) {
      throw new Error(`can not show orders information ${err}`);
    }
  }
  async deleteOrder(id: number): Promise<Orders> {
    try {
      const sql = `DELETE FROM orders WHERE id=($1) RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`can not show orders of id = ${id} : ${err}`);
    }
  }
  async updateOrders(
    id: number,
    statues: string,
    user_id: number
  ): Promise<Orders> {
    try {
      const sql = `UPDATE orders  SET 
      id=($1),order_status=($2), user_id=($3)
        WHERE id=($1) RETURNING *`;

      const conn = await Client.connect();
      const result = await conn.query(sql, [
        id,
        statues,
        user_id,
      ]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`can not show order of id = ${id}  : ${err}`);
    }
  }
}
