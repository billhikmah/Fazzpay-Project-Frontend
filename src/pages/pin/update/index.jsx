import React from "react";
import AuthLayout from "/src/layout/AuthLayout";
import styles from "/src/styles/UpdatePin.module.css";
import { useState } from "react";
import axios from "src/utility/axiosClient";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function UpdatePin() {
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
  const router = useRouter();

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
      await axios.patch(`/user/pin/${id}`, { pin: allPin });
      setIsLoading(false);
      router.push("/pin/success");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthLayout title="Update Pin">
        <div className={styles.mainContainer}>
          <div className={styles.text}>
            {" "}
            Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
            That You Created Yourself.
          </div>
          <div className={styles.subtext}>
            Create 6 digits pin to secure all your money and your data in
            FazzPay app. Keep it secret and don’t tell anyone about your FazzPay
            account password and the PIN.
          </div>
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
                "Confirm"
              )}
            </div>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}

export default UpdatePin;
