import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, pizzas }) => {
  const [pizzaList, setPizzaList] = useState(pizzas);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/pizzas/" + id);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleStatus = async (id) => {
    const order = orderList.find((order) => order._id === id);
    const currentStatus = order.status;

    try {
      const res = await axios.put("/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <div className={styles.container}>
      {/* Pizza Table */}
      <div className={styles.item}>
        <h1 className={styles.title}>Pizzas</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pizzaList.map((pizza) => (
              <tr className={styles.trTitle} key={pizza._id}>
                <td>
                  <Image
                    src={pizza.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt={pizza.title}
                  />
                </td>
                <td>{pizza._id.slice(0, 5)}...</td>
                <td>{pizza.title}</td>
                <td>${pizza.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(pizza._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Table */}
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr className={styles.trTitle} key={order._id}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>{order.method === 0 ? "cash" : "paid"}</td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || {};
  const baseURL = "https://pizza-store-dusky.vercel.app";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: `${baseURL}/admin/login`,
        permanent: false,
      },
    };
  }

  try {
    const [pizzaRes, orderRes] = await Promise.all([
      axios.get(`${baseURL}/api/pizzas`),
      axios.get(`${baseURL}/api/orders`),
    ]);

    return {
      props: {
        orders: orderRes.data,
        pizzas: pizzaRes.data,
      },
    };
  } catch (err) {
    console.error("Failed to fetch data:", err);
    return {
      props: {
        orders: [],
        pizzas: [],
      },
    };
  }
};

export default Index;
