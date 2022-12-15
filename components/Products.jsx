import React from 'react';
import style from "../styles/Products.module.css"
import ProductCard from "../components/ProductCards"

const Products = ({products}) => {
  return (
  <div className={style.container}>
      <h1 className={style.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={style.desc}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={style.wrapper}>
        {products.map((products) => (
          <ProductCard key={products._id} products={products} />
        ))}
      </div>
  </div>)
};

export default Products;
