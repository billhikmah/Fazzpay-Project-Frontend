import React, { useState } from "react";
import styles from "./Aside.module.css";
import { useRouter } from "next/router";
import {
  Grid,
  ArrowUp,
  PlusLg,
  Person,
  BoxArrowRight,
} from "react-bootstrap-icons";
import ModalTopUp from "src/components/ModalTopUp";
import ModalLogout from "../ModalLogout";

function Aside(props) {
  const [showModal, setShowModal] = useState(false);
  const [showModalLogout, setShowModalLogout] = useState(false);
  const modalHandler = () => {
    setShowModal(false);
  };
  const modalLogoutHandler = () => {
    setShowModalLogout(false);
  };
  const { active } = props;
  const router = useRouter();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.upperContainer}>
        <div
          className={
            active === "Home" || active === "History"
              ? styles.tabContainerActive
              : styles.tabContainer
          }
          onClick={() => {
            router.push("/home");
          }}
        >
          <div className={styles.tabLogo}>
            <Grid />
          </div>
          <div>Dashboard</div>
        </div>
        <div
          className={
            active === "Transfer"
              ? styles.tabContainerActive
              : styles.tabContainer
          }
          onClick={() => {
            router.push("/transfer");
          }}
        >
          <div className={styles.tabLogo}>
            <ArrowUp />
          </div>
          <div>Transfer</div>
        </div>
        <div
          className={
            active === "Top Up"
              ? styles.tabContainerActive
              : styles.tabContainer
          }
          onClick={() => {
            setShowModal(true);
          }}
        >
          <div className={styles.tabLogo}>
            <PlusLg />
          </div>
          <div>Top Up</div>
        </div>
        <div
          className={
            active === "Profile"
              ? styles.tabContainerActive
              : styles.tabContainer
          }
          onClick={() => {
            router.push("/profile");
          }}
        >
          <div className={styles.tabLogo}>
            <Person />
          </div>
          <div>Profile</div>
        </div>
      </div>
      <div className={styles.lowerContainer}>
        <div
          className={styles.tabContainer}
          onClick={() => {
            setShowModalLogout(true);
          }}
        >
          <div className={styles.tabLogo}>
            <BoxArrowRight />
          </div>
          <div>Logout</div>
        </div>
      </div>
      <ModalTopUp showModal={showModal} modalHandler={modalHandler} />
      <ModalLogout
        showModal={showModalLogout}
        modalHandler={modalLogoutHandler}
      />
    </div>
  );
}

export default Aside;
