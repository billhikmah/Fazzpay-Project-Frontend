import React, { useEffect, useState } from "react";
import Layout from "src/layout/DashboardLayout";
import styles from "/src/styles/Pin.module.css";
import { useRouter } from "next/router";
import { Eye, EyeSlash, Lock } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserAction,
  updatePassword,
  updatePin,
} from "src/redux/action/user";
import { Toast, ToastContainer } from "react-bootstrap";

function Pin() {
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const id = useSelector((state) => state.user.id);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    await setPin({ ...pin, [e.target.id]: e.target.value });
  };
  const inputFocus = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 6) {
        e.target.form.elements[next].focus();
      }
    }
  };
  const updateHandler = async (e) => {
    // e.preventDefault();
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }
    try {
      setIsLoading(true);
      await dispatch(updatePin({ pin: allPin }, id));
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => {
        router.push("/profile/");
      }, 3000);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Profile">
      <div className={styles.mainContainer}>
        <div className={styles.title}>Change PIN</div>
        <div className={styles.subtitle}>
          Type your new 6 digits security PIN to use in Fazzpay.
        </div>
        <div className={styles.lowerContainer}>
          <form>
            <div className="d-flex gap-3 justify-content-center">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item}>
                  <input
                    type="number"
                    maxLength="1"
                    autoComplete="off"
                    className={styles.input}
                    style={{ width: "40px" }}
                    tabIndex={item}
                    id={`pin${item}`}
                    // value={[`${item}`]}
                    onChange={handleChange}
                    onKeyUp={inputFocus}
                  />
                </div>
              ))}
            </div>
            <div
              className={
                pin.pin1 &&
                pin.pin2 &&
                pin.pin3 &&
                pin.pin4 &&
                pin.pin5 &&
                pin.pin6
                  ? styles.buttonActive
                  : styles.button
              }
              onClick={() => {
                if (
                  pin.pin1 &&
                  pin.pin2 &&
                  pin.pin3 &&
                  pin.pin4 &&
                  pin.pin5 &&
                  pin.pin6
                ) {
                  updateHandler();
                }
              }}
            >
              {isLoading ? (
                <div
                  className="spinner-border text-light spinner-border-sm"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Change Pin"
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        className="p-3 position-fixed toast-container"
      >
        <Toast
          show={showToast}
          onClose={() => {
            setShowToast(false);
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>Your pin is updated</Toast.Body>
        </Toast>
      </ToastContainer>
    </Layout>
  );
}

export default Pin;
