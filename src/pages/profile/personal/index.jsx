import React, { useEffect, useState } from "react";
import Layout from "src/layout/DashboardLayout";
import styles from "/src/styles/Personal.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "src/utility/axiosClient";
import { ArrowRight, Pencil } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction, updateImage } from "src/redux/action/user";

function Personal() {
  const user = useSelector((state) => state.user.data);
  const router = useRouter();

  return (
    <Layout title="Profile">
      <div className={styles.mainContainer}>
        <div className={styles.title}>Personal Information</div>
        <div className={styles.subtitle}>
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.itemTitle}>First Name</div>
          <div className={styles.itemValue}>{user.firstName}</div>
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.itemTitle}>Last Name</div>
          <div className={styles.itemValue}>{user.lastName}</div>
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.itemTitle}>Verified E-mail</div>
          <div className={styles.itemValue}>{user.email}</div>
        </div>
        <div className={styles.phoneContainer}>
          <div className={styles.phone}>
            <div className={styles.itemTitle}>Phone Number</div>
            <div className={styles.itemValue}>{user.noTelp}</div>
          </div>
          <div
            className={styles.manage}
            onClick={() => {
              router.push("/profile/update/phone");
            }}
          >
            Manage
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Personal;
