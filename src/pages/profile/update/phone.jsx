import React, { useState } from "react";
import Layout from "src/layout/DashboardLayout";
import styles from "/src/styles/Phone.module.css";
import { useRouter } from "next/router";
import { Telephone } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction, updateImage, updatePhone } from "src/redux/action/user";
import { Toast, ToastContainer } from "react-bootstrap";

function Phone() {
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const user = useSelector((state) => state.user.data);
  const router = useRouter();
  const dispatch = useDispatch();

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const updateHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(updatePhone(form, user.id));
      await dispatch(getUserAction(user.id));
      setForm({ ...form, noTelp: "" });
      setShowToast(true);
      setIsLoading(false);
    } catch (error) {
      setForm({});
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Profile">
      <div className={styles.mainContainer}>
        <div className={styles.title}>Edit Phone Number</div>
        <div className={styles.subtitle}>
          Add at least one phone number for the transfer ID so you can start
          transfering your money to another user.
        </div>
        <div className={styles.lowerContainer}>
          <div className={styles.inputContainer}>
            <Telephone className={styles.phone} />
            <div>+62</div>
            <input
              type="tel"
              className={styles.input}
              maxLength="12"
              placeholder="Enter your phone number"
              onChange={formHandler}
              name="noTelp"
              value={form.noTelp}
            />
          </div>
          {form.noTelp ? (
            form.noTelp.length >= 11 ? (
              <div className={styles.buttonActive} onClick={updateHandler}>
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Edit Phone Number"
                )}
              </div>
            ) : (
              <div className={styles.button}>Edit Phone Number</div>
            )
          ) : (
            <div className={styles.button}>Edit Phone Number</div>
          )}
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
            // router.push("/profile/personal");
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>Your phone is updated</Toast.Body>
        </Toast>
      </ToastContainer>
    </Layout>
  );
}

export default Phone;
