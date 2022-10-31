/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import styles from "/src/styles/AuthLayout.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

function Layout(props) {
  const router = useRouter();
  const title = `FazzPay - ${props.title}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.mainContainer} row`}>
        <div className={`${styles.leftContainer} col-sm-12 col-md-6 col-lg-6`}>
          <div
            className={styles.title}
            onClick={() => {
              router.push("/");
            }}
          >
            FazzPay
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={require("../assets/images/phone-1.png")}
              alt="phone"
              className={styles.image}
            />
          </div>
          <div className={styles.subtitle}>
            App that Covering Banking Needs.
          </div>
          <div className={styles.text}>
            FazzPay is an application that focussing in banking needs for all
            users in the world. Always updated and always following world
            trends. 5000+ users registered in FazzPay everyday with worldwide
            users coverage.
          </div>
        </div>
        <div className={`${styles.rightContainer} col-sm-12 col-md-6 col-lg-6`}>
          {props.children}
        </div>
      </main>
    </>
  );
}

export default Layout;
