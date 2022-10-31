import React from "react";
import AuthLayout from "/src/layout/AuthLayout";
import styles from "/src/styles/Signup.module.css";
import { Person, Envelope, Lock, Eye, EyeSlash } from "react-bootstrap-icons";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ModalSuccess from "src/components/ModalSuccess";
import axios from "axios";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const signupHandler = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      await axios.post(`${process.env.URL_BACKEND}/auth/register`, form);
      setIsLoading(false);
      setShowModal(true);
    } catch (error) {
      if (error.response.data.msg === "Email already exist") {
        setErrorMessage("Email is already registered");
        setIsLoading(false);
        return;
      }
      setErrorMessage(error.response.data.msg);
      setIsLoading(false);
    }
  };
  return (
    <>
      <AuthLayout title="Sign Up">
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
            <Person />
            <input
              type="text"
              placeholder="Enter your firstname"
              className={styles.input}
              name="firstName"
              onChange={formHandler}
            />
          </div>
          <div className={styles.inputContainer}>
            <Person />
            <input
              type="text"
              placeholder="Enter your lastname"
              className={styles.input}
              name="lastName"
              onChange={formHandler}
            />
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
              placeholder="Create your password"
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
          {errorMessage ? (
            <div className={styles.error}>{errorMessage}</div>
          ) : (
            <div className={styles.error}> &nbsp;</div>
          )}
          <div
            className={
              form.firstName && form.lastName && form.email && form.password
                ? styles.buttonActive
                : styles.button
            }
            onClick={() => {
              if (isLoading) {
                return;
              }
              if (
                form.firstName &&
                form.lastName &&
                form.email &&
                form.password
              ) {
                return signupHandler();
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
              "Sign Up"
            )}
          </div>
          <div className={styles.loginContainer}>
            Already have an account? Let’s{" "}
            <span
              className={styles.loginButton}
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Login
            </span>
          </div>
        </div>
        <ModalSuccess showModal={showModal} />
      </AuthLayout>
    </>
  );
}

export default Signup;
