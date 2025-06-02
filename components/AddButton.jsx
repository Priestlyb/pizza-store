import styles from "../styles/Add.module.css";
import Link from "next/link";

const AddButton = ({ setClose }) => {
  return (
    <div className={styles.addButtoncontainer}>
      <div className={styles.adminButton}>
        <Link href="/admin" passHref>
        Admin
        </Link>
      </div>
      <div>
        <button onClick={() => setClose(false)} className={styles.mainAddButton}>
          Add New Pizza
        </button>
      </div>
    </div>
  );
};

export default AddButton;
