import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <nav className={`navbar ${styles.mainContainer}`}>
      <div className={styles.text}>2020 FazzPay. All right reserved.</div>
      <div className={styles.tabContainer}>
        <div className={styles.text}>+62 5637 8882 9901</div>
        <div className={styles.text}>contact@fazzpay.com</div>
      </div>
    </nav>
  );
}

export default Footer;
