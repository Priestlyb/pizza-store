import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import styles from "/styles/product.module.css";
import { addPizza } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const handleSizeChange = (newSize) => {
    const priceDifference = pizza.prices[newSize] - pizza.prices[size];
    setSize(newSize);
    setPrice((prev) => prev + priceDifference);
  };

  const handleExtraChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      setExtras((prev) => [...prev, option]);
      setPrice((prev) => prev + option.price);
    } else {
      setExtras((prev) => prev.filter((item) => item._id !== option._id));
      setPrice((prev) => prev - option.price);
    }
  };

  const handleAddToCart = () => {
    dispatch(addPizza({ ...pizza, extras, price, quantity }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            alt={pizza.title || "Pizza image"}
            width={500}  // example
            height={500} // example
            style={{ objectFit: "contain" }}
            priority
          />

        </div>
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price.toFixed(2)}</span>
        <p className={styles.desc}>{pizza.desc}</p>

        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          {["Small", "Medium", "Large"].map((label, index) => (
            <div
              key={label}
              className={`${styles.size} ${index === size ? styles.selected : ""}`}
              onClick={() => handleSizeChange(index)}
            >
              <Image src="/img/size.png"
                width={500}  // example
                height={500} // example
                style={{ objectFit: "contain" }}
                priority alt={`${label} size`} />
              <span className={styles.number}>{label}</span>
            </div>
          ))}
        </div>

        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOption?.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option._id}
                className={styles.checkbox}
                onChange={(e) => handleExtraChange(e, option)}
              />
              <label htmlFor={option._id}>
                {option.text} (+${option.price.toFixed(2)})
              </label>
            </div>
          ))}
        </div>

        <div className={styles.add}>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Number(e.target.value)))
            }
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {

  const NEXT_PUBLIC_BASE_URL = 'https://pizza-store-dusky.vercel.app';

  console.log("BASE BASE_URL:", NEXT_PUBLIC_BASE_URL);

  try {
    const res = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/pizzas/${params.id}`);


    return { props: { pizza: res.data } };
  } catch (err) {
    console.error("Error fetching pizza:", err.message);
    return { notFound: true };
  }
};

export default Product;
