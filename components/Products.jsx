import React from 'react';
import style from "../styles/Products.module.css"
import ProductCard from "./ProductCards"

const Products = ({pizzas}) => {
  return (
  <div className={style.container}>
      <h1 className={style.title}>THE BEST BENZ IN TOWN</h1>
      <p className={style.desc}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={style.wrapper}>
        {pizzas.map((pizza) => (
        <ProductCard key={pizza._id} pizzas={pizza} />
      ))}
      </div>
  </div>)
};

export default Products;
