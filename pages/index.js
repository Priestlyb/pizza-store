import Head from 'next/head'
import axios from "axios";
import { useState } from "react";
import Featured from '../components/Featured'
import Products from '../components/Products'
import styles from '../styles/Home.module.css'
import Add from "../components/Add";
import AddButton from "../components/AddButton";

// create our App
export default function Home({ products, admin}) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best Pizza in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <Products products={products} />
      {!close && <Add setClose={setClose} />}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      products: res.data,
      admin,
    },
  };
};
