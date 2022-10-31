import React from "react";
import AuthLayout from "/src/layout/AuthLayout";
import styles from "/src/styles/SuccessPin.module.css";
import { CheckCircleFill } from "react-bootstrap-icons";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();

  return (
    <>
      <AuthLayout title="Success Create Pin">
        <div className={styles.mainContainer}>
          <div className={styles.checkContainer}>
            <CheckCircleFill className={styles.check} />
          </div>
          <div className={styles.text}>Your PIN Was Successfully Created</div>
          <div className={styles.subtext}>
            Your PIN was successfully created and you can now access all the
            features in FazzPay.
          </div>
          <div
            className={styles.buttonActive}
            onClick={() => {
              router.push("/home");
            }}
          >
            Go To Dashboard
          </div>
        </div>
      </AuthLayout>
    </>
  );
}

export default Login;
