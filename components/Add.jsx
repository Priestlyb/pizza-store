import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState(["", "", ""]);
  const [extraOption, setExtraOption] = useState([]);
  const [extra, setExtra] = useState({ text: "", price: "" });

  const changePrice = (e, index) => {
    const currentPrices = [...prices];
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    const { name, value } = e.target;
    setExtra((prev) => ({ ...prev, [name]: value }));
  };

  const handleExtra = () => {
    if (extra.text && extra.price) {
      setExtraOption((prev) => [...prev, extra]);
      setExtra({ text: "", price: "" });
    }
  };

  const handleCreate = async () => {
  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");

  // Debug FormData
  for (let pair of data.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/priestlythedon/image/upload",
      data
    );

    const { url } = uploadRes.data;

    const newProduct = {
      title,
      desc,
      prices: prices.map((p) => Number(p)),
      extraOption: extraOption.map((opt) => ({
        text: opt.text,
        price: Number(opt.price),
      })),
      img: url,
    };

    await axios.post("/api/pizzas", newProduct);
    setClose(true);
  } catch (err) {
    console.error("Failed to create pizza:", err.response?.data || err.message);
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>

        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.input}
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              value={prices[0]}
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              value={prices[1]}
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              value={prices[2]}
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Extra Options</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              value={extra.text}
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              value={extra.price}
              onChange={handleExtraInput}
            />
            <button
              className={styles.extraButton}
              type="button"
              onClick={handleExtra}
            >
              Add
            </button>
          </div>

          <div className={styles.extraItems}>
            {extraOption.map((option, index) => (
              <span key={index} className={styles.extraItem}>
                {option.text} (${option.price})
              </span>
            ))}
          </div>
        </div>

        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
