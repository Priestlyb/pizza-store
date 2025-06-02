// pages/admin/orders.js

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/OrderList.module.css"; // You'll create this

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const NEXT_PUBLIC_BASE_URL = 'https://pizza-store-dusky.vercel.app';
      try {
        const res = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/orders`);
        setOrders(res.data);
        setFilteredOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  const handleSearch = () => {
    if (!query) {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) =>
          order._id.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.orderTitile}>
        <input
          type="text"
          placeholder="Search by Order ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    order.status === 0
                      ? styles.paid
                      : order.status === 1
                      ? styles.preparing
                      : order.status === 2
                      ? styles.onTheWay
                      : styles.delivered
                  }`}
                >
                  {
                    ["Paid", "Preparing", "On the Way", "Delivered"][
                      order.status
                    ]
                  }
                </span>
              </td>

              <td>
                <Link href={`/orders/${order._id}`}>
                  <a className={styles.viewLink}>View</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
