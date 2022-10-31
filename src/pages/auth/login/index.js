import React from "react";
import AuthLayout from "/src/layout/AuthLayout";
import styles from "/src/styles/Login.module.css";
import { Envelope, Lock, Eye, EyeSlash } from "react-bootstrap-icons";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "src/redux/action/user";
import Cookies from "js-cookie";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const loginHandler = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      const result = await dispatch(signinAction(form));
      Cookies.set("token", result.action.payload.data.data.token);
      setIsLoading(false);
      if (result.action.payload.data.data.pin) {
        return router.push("/home");
      }
      router.push("/pin/update");
    } catch (error) {
      if (error.response.data.msg === "Email / Account not registed") {
        setErrorMessage("Email or password is incorrect");
        setIsLoading(false);
        return;
      }
      if (error.response.data.msg === "Wrong password") {
        setErrorMessage("Email or password is incorrect");
        setIsLoading(false);
        return;
      }
      setErrorMessage(error.response.data.msg);
      setIsLoading(false);
    }
  };
  return (
    <>
      <AuthLayout title="Login">
        <div className={styles.mainContainer}>
          <div className={styles.text}>
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </div>
          <div className={styles.subtext}>
            Transfering money is eassier than ever, you can access FazzPay
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </div>
          <div className={styles.inputContainer}>
            <Envelope />
            <input
              type="text"
              placeholder="Enter your e-mail"
              className={styles.input}
              name="email"
              onChange={formHandler}
            />
          </div>
          <div className={styles.inputContainer}>
            <Lock />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={styles.input}
              name="password"
              onChange={formHandler}
            />
            {showPassword ? (
              <Eye
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <EyeSlash
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}
          </div>
          <div
            className={styles.forgot}
            onClick={() => {
              // router.push("/");
            }}
          >
            Forgot password?
          </div>

          {errorMessage ? (
            <div className={styles.error}>{errorMessage}</div>
          ) : (
            <div className={styles.error}> &nbsp;</div>
          )}
          <div
            className={
              form.email && form.password ? styles.buttonActive : styles.button
            }
            onClick={() => {
              if (form.email && form.password) {
                return loginHandler();
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
              "Login"
            )}
          </div>
          <div className={styles.signupContainer}>
            Don’t have an account? Let’s{" "}
            <span
              className={styles.signupButton}
              onClick={() => {
                router.push("/auth/signup");
              }}
            >
              Sign Up
            </span>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}

export default Login;
