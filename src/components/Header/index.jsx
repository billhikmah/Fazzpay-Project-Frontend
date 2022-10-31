import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { Bell } from "react-bootstrap-icons";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "src/redux/action/user";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);
  const data = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(getUserAction(id));
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await Cookies.get("token");
    if (!token) {
      return router.push("/auth/login");
    }
  };
  return (
    <nav className={`navbar ${styles.mainContainer}`}>
      <div className={`navbar-brand ${styles.title}`}>FazzPay</div>
      <div className={`navbar-brand ${styles.tabContainer}`}>
        <div>
          <Image
            src={
              data
                ? data.image
                  ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${data.image}`
                  : require("../../assets/images/background-1.png")
                : require("../../assets/images/background-1.png")
            }
            width={35}
            height={35}
            alt="profile"
            className={styles.image}
          />
        </div>
        <div className={styles.profileContainer}>
          <div
            className={styles.name}
          >{`${data.firstName} ${data.lastName}`}</div>
          <div className={styles.phone}>
            {data.noTelp ? data.noTelp : <div>&nbsp;</div>}
          </div>
        </div>
        <div className={styles.bell}>
          <Bell />
        </div>
      </div>
    </nav>
  );
}

export default Header;
