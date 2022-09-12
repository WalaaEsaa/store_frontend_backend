import Client from '../DBconnection';

export type OrdersProducts = {
  order_id?: number;
  product_quantity: number;
  product_id: number;
  };

export class OrdersProduct_store {
  async create(orderproduct: OrdersProducts): Promise<OrdersProducts> {
    const sql = `INSERT INTO orders_products(order_id,product_id,product_quantity) 
    VALUES ($1,$2,$3)  RETURNING *`;
 
    const conn = await Client.connect();
    const result = await conn.query(sql, [
        orderproduct.order_id,
        orderproduct.product_id,
        orderproduct.product_quantity,
          ]);
    const ordern = result.rows[0];
    conn.release();
    return ordern;
  }

    async getALL(): Promise<OrdersProducts[]> {
    try {
      const sql = 'SELECT * FROM orders_products';
      const conn = await Client.connect();
      const result = await conn.query(sql);
      const product = result.rows;
      conn.release;
      return product;
    } catch (err) {
      throw new Error(`can not show orders information ${err}`);
    }
  }
  async showOrder(order_id:number): Promise<OrdersProducts[]> {
    try {
      const sql = 'SELECT * FROM orders_products WHERE order_id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql,[order_id]);
      const product = result.rows;
      conn.release;
      return product;
    } catch (err) {
      throw new Error(`can not show orders information ${err}`);
    }
  }
  
  async updateQuantity(
       product_quantity: number,
       order_id:number,
       product_id:number
  ): Promise<OrdersProducts> {
    try {
      const sql = `UPDATE orders_products  SET 
     product_quantity=($1)
        WHERE order_id=($2) AND product_id=(#3) RETURNING *`;

      const conn = await Client.connect();
      const result = await conn.query(sql, [
        product_quantity,
        order_id,
        product_id,
           ]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`can not show order of id = ${order_id}  : ${err}`);
    }
  }
}
