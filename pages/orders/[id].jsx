import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({ order }) => {
  if (!order) return <p>Order not found.</p>;

  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td><span className={styles.id}>{order._id}</span></td>
                <td><span className={styles.name}>{order.customer}</span></td>
                <td><span className={styles.address}>{order.address}</span></td>
                <td><span className={styles.total}>${order.total}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          {[
            { label: "Payment", icon: "/img/paid.png" },
            { label: "Preparing", icon: "/img/bake.png" },
            { label: "On the way", icon: "/img/bike.png" },
            { label: "Delivered", icon: "/img/delivered.png" },
          ].map((step, i) => (
            <div key={i} className={statusClass(i)}>
              <Image src={step.icon} width={30} height={30} alt={step.label} />
              <span>{step.label}</span>
              <div className={styles.checkedIcon}>
                <Image src="/img/checked.png" width={20} height={20} alt="Checked" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${order.total}
          </div>
          <button disabled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const NEXT_PUBLIC_BASE_URL = 'https://pizza-store-dusky.vercel.app';
  try {
    const res = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/orders/${params.id}`);
    return {
      props: { order: res.data },
    };
  } catch (err) {
    console.error("Error fetching order:", err);
    return {
      props: { order: null },
    };
  }
};

export default Order;
