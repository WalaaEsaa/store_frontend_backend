import Client from "../DBconnection"


export type Orders = {
  id?: number,
  user_id: number,
  product_id: number,
  quantity: number,
  statuse: string

}
export class Orders_store {
  async create(order: Orders): Promise<Orders> {
    const sql = 'INSERT INTO orders(product_quantity,order_status,product_id,user_id) VALUES ($1,$2,$3,$4) WHERE  orders.user_id=users.id && orders.product_id=product.id '
    const conn = await Client.connect()
    const result = await conn.query(sql)
    const ordern = result.rows[0]
    conn.release()
    return ordern
  }

  async showCurrentOrders(user_id: number): Promise<Orders[] | null> {
    const sql = "SELECT product_quantity, order_status, product_id, user_id FROM orders INNER JOIN users  ON orders.user_id=users.id  WHERE orders.user_id=$1"
    const conn = await Client.connect()
    const result = await conn.query(sql, [user_id])
    const order = result.rows
    conn.release()
    return order
  }
}