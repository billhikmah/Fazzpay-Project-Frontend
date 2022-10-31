import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Landing.module.css";

export default function Landing() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>FazzPay</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.headerTitle}>FazzPay</div>
          <div className={styles.buttonContainer}>
            <div
              className={styles.loginButton}
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Login
            </div>
            <div
              className={styles.signupButton}
              onClick={() => {
                router.push("/auth/signup");
              }}
            >
              Sign Up
            </div>
          </div>
        </div>
        <div className={styles.bannerContainer}>
          <div className={styles.title}>
            Awesome App
            <br />
            For Saving Time.
          </div>
          <div className={styles.bannerText}>
            We bring you a mobile app for banking problems that
            <br />
            oftenly wasting much of your times.
          </div>
          <div
            className={styles.tryButton}
            onClick={() => {
              router.push("/auth/signup");
            }}
          >
            Try It Free
          </div>
        </div>
      </main>
    </div>
  );
}
