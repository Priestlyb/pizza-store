import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import style from "../styles/ProductCards.module.css"

const ProductCards = ({products}) => {
  return (
  <div className={style.container}>
    <Link href={`/product/${products._id}`} passHref>
      <Image src={products.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={style.title}>{products.title}</h1>
      <span className={style.price}>${products.prices[0]}</span>
      <p className={style.desc}>
        {products.desc}
      </p>
  </div>
)
};

export default ProductCards;
