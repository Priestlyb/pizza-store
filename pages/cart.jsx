import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { reset, removePizza, updateQuantity, loadCartFromStorage } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const TAX_RATE = 0.05;
  const DISCOUNT = 0; // Could make dynamic
  const TAX = cart.total * TAX_RATE;
  const TOTAL_WITH_TAX = cart.total + TAX - DISCOUNT;

  const NEXT_PUBLIC_BASE_URL = 'https://pizza-store-dusky.vercel.app';
  const NEXT_PUBLIC_PAYPAL_CLIENT_ID = "AdTkw8GGKiERtk8Edl6CazJ4VxcnrluUtVUhgKxijmiIuZwpOy7yelGtdxeY284ij81Emu9D60SBwxGx";

  useEffect(() => {
    const savedCart = localStorage.getItem("pizza_cart");
    if (savedCart) {
      dispatch(loadCartFromStorage(JSON.parse(savedCart)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pizza_cart", JSON.stringify(cart));
  }, [cart]);

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/orders`, data);
      if (res.status === 201) {
        dispatch(reset());
        localStorage.removeItem("pizza_cart");
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.error("Order creation failed:", err);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, paypalDispatch] = usePayPalScriptReducer();

    useEffect(() => {
      paypalDispatch({
        type: "resetOptions",
        value: { ...options, currency },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          forceReRender={[amount, currency, style]}
          createOrder={(data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: TOTAL_WITH_TAX.toFixed(2),
                  },
                },
              ],
            })
          }
          onApprove={(data, actions) =>
            actions.order.capture().then((details) => {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: TOTAL_WITH_TAX,
                method: 1,
              });
            })
          }
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.pizzas.map((pizza) => (
              <tr className={styles.tr} key={pizza._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={pizza.img}
                      layout="fill"
                      objectFit="cover"
                      alt={pizza.title}
                    />
                  </div>
                </td>
                <td>{pizza.title}</td>
                <td>
                  {pizza.extras.map((extra, index) => (
                    <span key={extra._id}>
                      {extra.text}
                      {index < pizza.extras.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </td>
                <td>${pizza.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={pizza.quantity}
                    onChange={(e) =>
                      handleQuantityChange(pizza._id, parseInt(e.target.value))
                    }
                    className={styles.quantityInput}
                  />
                </td>
                <td>${(pizza.price * pizza.quantity).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => dispatch(removePizza(pizza._id))}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b>Subtotal:</b> ${cart.total.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b>Tax (5%):</b> ${TAX.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b>Discount:</b> ${DISCOUNT.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b>Total:</b> ${TOTAL_WITH_TAX.toFixed(2)}
          </div>

          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton} onClick={() => setCash(true)}>
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id": NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                  components: "buttons",
                  currency: "USD",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className={styles.button}
              disabled={cart.total === 0}
            >
              CHECKOUT NOW!
            </button>

          )}
        </div>
      </div>

      {cash && <OrderDetail total={TOTAL_WITH_TAX} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
