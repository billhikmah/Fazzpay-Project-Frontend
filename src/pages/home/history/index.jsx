import React, { useEffect } from "react";
import Layout from "src/layout/DashboardLayout";
import styles from "/src/styles/History.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "src/redux/action/user";

function History() {
  const history = useSelector((state) => state.user.history);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHistory());
  });

  return (
    <Layout title="History">
      <div className={styles.mainContainer}>
        <div className={styles.historyTitleContainer}>
          <div className={styles.transaction}>Transaction History</div>
          <div className={styles.seeAllButton}>Select Filter</div>
        </div>
        {history.length > 0
          ? history.map((item) => {
              return (
                <div className={styles.historyItemContainer} key={item.id}>
                  <div className={`col-1 ${styles.historyImageContainer}`}>
                    <Image
                      src={
                        item.image
                          ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${item.image}`
                          : require("../../../assets/images/background-1.png")
                      }
                      width={35}
                      height={35}
                      alt="profile"
                      className={styles.historyImage}
                    />
                  </div>
                  <div className={`col-8 ${styles.historyProfile}`}>
                    <div
                      className={styles.historyName}
                    >{`${item.firstName} ${item.lastName}`}</div>
                    <div className={styles.historyType}>{item.type}</div>
                  </div>
                  <div
                    className={`col-3 ${
                      item.type === "send"
                        ? styles.totalExpense
                        : styles.totalIncome
                    }`}
                  >
                    {item.type === "send"
                      ? `-${item.amount}`
                      : `+${item.amount}`}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </Layout>
  );
}

export default History;
