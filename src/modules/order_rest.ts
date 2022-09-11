import Client from '../DBconnection';

export type Orders = {
  id?: number;
  quantity: number;
  statuse: string;
  product_id: number;
  user_id: number;
};

export class Orders_store {
  async create(order: Orders): Promise<Orders> {
    const sql = `INSERT INTO orders(product_quantity,order_status,product_id,user_id) 
    VALUES ($1,$2,$3,$4) RETURNING *`;
    const conn = await Client.connect();
    const result = await conn.query(sql, [
      order.quantity,
      order.statuse,
      order.product_id,
      order.user_id,
    ]);
    const ordern = result.rows[0];
    conn.release();
    return ordern;
  }

  async showCurrentOrders(user_id: number): Promise<Orders[] | null> {
    const sql = `SELECT product_quantity, order_status, product_id, user_id
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
    quantity: number,
    statues: string,
    product_id: number,
    user_id: number
  ): Promise<Orders> {
    try {
      const sql = `UPDATE orders  SET 
       product_quantity=($1), order_status=($2), product_id=($3), user_id=($4)
        WHERE id=($5) RETURNING *`;

      const conn = await Client.connect();
      const result = await conn.query(sql, [
        id,
        quantity,
        statues,
        product_id,
        user_id,
      ]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`can not show order of id =  : ${err}`);
    }
  }
}
