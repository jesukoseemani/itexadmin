import styles from "../AccountSettings.module.scss";

interface word {
  text: string;
}

const Snackbar = ({text}: word) => {
  return (
    <div style={{ display: "flex" }}>
      <div className={styles.buttonWrapper}>
        <button className={styles.headerButton}>Test Mode</button>

        <span className={styles.navbarTitle}>{text}</span>
      </div>
    </div>
  );
};

export default Snackbar;
