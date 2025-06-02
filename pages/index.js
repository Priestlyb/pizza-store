import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import Featured from "../components/Featured";
import Pizzas from "../components/Products";
import styles from "../styles/Home.module.css";
import Add from "../components/Add";
import AddButton from "../components/AddButton";

// create our App
export default function Home({ pizzas, admin }) {
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
      <Pizzas pizzas={pizzas} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const NEXT_PUBLIC_BASE_URL = 'https://pizza-store-dusky.vercel.app';

  try {
    const res = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/pizzas`);
    console.log("Fetched pizzas:", res.data);
    return {
      props: {
        pizzas: res.data,
        admin,
      },
    };
  } catch (error) {
    console.error("Failed to fetch pizzas:", error.message);
  if (error.response) {
    console.error("Response status:", error.response.status);
    console.error("Response data:", error.response.data);
  }
    return {
      props: {
        pizzas: [],
        admin,
      },
    };
  }
};
