import Image from 'next/image';
import React, { useState } from 'react';
import styles from "../styles/Featured.module.css"

const Featured = () => {
        const [index, setIndex] = useState(0)
    const images = [
        "/img/featured2.png",
        "/img/featured3.png",
        "/img/featured2.png"
    ]

const handleArrow = (direction) => {
    if(direction==="i"){
        setIndex(index !== 0 ? index-1 : 2)
    }

    if(direction==="r"){
        setIndex(index !== 2 ? index+1 : 0)
    }
}

  return (
    <div className={styles.container}>
        <div className={styles.arrowContainer} style={{left:0}} onClick={() => handleArrow("i")}><i className="fa-solid fa-angle-left"></i>
        </div>
        <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="images" layout="fill" objectFit="contain" />
          </div>
        ))}
        </div>
        <div className={styles.arrowContainer} style={{right:0}} onClick={()=>handleArrow("r")}>
        <Image src="/img/arrowr" layout='fill' alt="" objectFit="contain" />
        </div>
    </div>
    );
};

export default Featured;
