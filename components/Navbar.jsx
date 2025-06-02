import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faAffiliatetheme } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link href="/">
          <a className={styles.brand}>
            TR<FontAwesomeIcon width={25} height={25} icon={faAffiliatetheme} />TH PIZZA
          </a>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        <Link href="/">
          <a>Menu</a>
        </Link>
        <Link href="/orders">
          <a>Order</a>
        </Link>
        <Link href="#">
          <a>About &amp; Contact</a>
        </Link>
      </nav>

      {/* Right Section */}
      <div className={styles.icons}>
        <div className={styles.phone}>
          <FontAwesomeIcon width={25} height={25} icon={faPhoneAlt} />
          <span>+234 806 715 6986</span>
        </div>

        <Link href="/cart">
          <a className={styles.cart}>
            <Image src="/img/cart.png" alt="cart" width={25} height={25} />
            <span className={styles.counter}>{quantity}</span>
          </a>
        </Link>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon
            icon={menuOpen ? faXmark : faBarsStaggered}
            width={25}
            height={25}
          />
        </button>


      </div>
    </header>
  );
};

export default Navbar;
