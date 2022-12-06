import React, { useEffect, useState } from "react";
import Layout from "src/layout/DashboardLayout";
import styles from "/src/styles/Password.module.css";
import { useRouter } from "next/router";
import { Eye, EyeSlash, Lock } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction, updatePassword } from "src/redux/action/user";
import { Toast, ToastContainer } from "react-bootstrap";

function Password() {
  const [form, setForm] = useState({});
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("");
      setIsLoading(true);
      console.log(form);
      await dispatch(updatePassword(form, user.id));
      await dispatch(getUserAction(user.id));
      setForm({
        ...form,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowToast(true);
      setIsLoading(false);
    } catch (error) {
      setForm({});
      setErrorMessage(error.response.data.msg);
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Profile">
      <div className={styles.mainContainer}>
        <div className={styles.title}>Change Password</div>
        <div className={styles.subtitle}>
          You must enter your current password and then type your new password
          twice.
        </div>
        <div className={styles.lowerContainer}>
          <div className={styles.inputContainer}>
            <Lock className={styles.phone} />
            <input
              type={showCurrent ? "text" : "password"}
              className={styles.input}
              onChange={formHandler}
              name="oldPassword"
              placeholder="Current password"
              value={form.oldPassword}
            />
            {showCurrent ? (
              <Eye
                onClick={() => {
                  setShowCurrent(!showCurrent);
                }}
              />
            ) : (
              <EyeSlash
                onClick={() => {
                  setShowCurrent(!showCurrent);
                }}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <Lock className={styles.phone} />
            <input
              type={showNew ? "text" : "password"}
              className={styles.input}
              onChange={formHandler}
              name="newPassword"
              placeholder="New password"
              value={form.newPassword}
            />
            {showNew ? (
              <Eye
                onClick={() => {
                  setShowNew(!showNew);
                }}
              />
            ) : (
              <EyeSlash
                onClick={() => {
                  setShowNew(!showNew);
                }}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <Lock className={styles.phone} />
            <input
              type={showConfirm ? "text" : "password"}
              className={styles.input}
              onChange={formHandler}
              name="confirmPassword"
              placeholder="Repeat new password"
              value={form.confirmPassword}
            />
            {showConfirm ? (
              <Eye
                onClick={() => {
                  setShowConfirm(!showConfirm);
                }}
              />
            ) : (
              <EyeSlash
                onClick={() => {
                  setShowConfirm(!showConfirm);
                }}
              />
            )}
          </div>
          {errorMessage ? (
            <div className={styles.error}>{errorMessage}</div>
          ) : (
            <div className={styles.error}> &nbsp;</div>
          )}
          {form.oldPassword && form.newPassword && form.confirmPassword ? (
            <div className={styles.buttonActive} onClick={updateHandler}>
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Change Password"
              )}
            </div>
          ) : (
            <div className={styles.button}>Change Password</div>
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
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>Your password is updated</Toast.Body>
        </Toast>
      </ToastContainer>
    </Layout>
  );
}

export default Password;
