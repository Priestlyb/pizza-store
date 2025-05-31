import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import style from "../styles/ProductCards.module.css"

const ProductCards = ({pizzas}) => {
  return (
  <div className={style.container}>
    <Link href={`/pizza/${pizzas._id}`} passHref>
      <Image src={pizzas.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={style.title}>{pizzas.title}</h1>
      <span className={style.price}>${pizzas.prices[0]}</span>
      <p className={style.desc}>
        {pizzas.desc}
      </p>
  </div>
)
};

export default ProductCards;
