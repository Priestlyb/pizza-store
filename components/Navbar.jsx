import Image from 'next/image';
import React from 'react';
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "../styles/Navbar.module.css"

// get our fontawesome imports
import { faAffiliatetheme } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// create our App
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="30" height="30" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>+234 806 715 6986</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/orders" passHref>
            <li className={styles.listItem}>Order</li>
          </Link>
          <li className={styles.listItem}>Menu</li>

          <Link href="/" passHref>
            <li className={styles.listItem}>
              TR<FontAwesomeIcon icon={faAffiliatetheme} width="25" height="25" />TH Pizza
            </li>
          </Link>
          <li className={styles.listItem}>About & Contact</li>
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
