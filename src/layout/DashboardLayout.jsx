import React, { useEffect } from "react";
import Head from "next/head";
import styles from "/src/styles/DashboardLayout.module.css";
import Image from "next/image";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import Aside from "src/components/Aside";

function Layout(props) {
  const title = `FazzPay - ${props.title}`;

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={`row ${styles.mainContainer}`}>
        <div className={`${styles.leftContainer} col-sm-12 col-md-12 col-lg-3`}>
          <Aside active={props.title} />
        </div>
        <div
          className={`${styles.rightContainer} col-sm-12 col-md-12 col-lg-9`}
        >
          {props.children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
