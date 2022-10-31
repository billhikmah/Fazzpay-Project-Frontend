import React, { useEffect, useState } from "react";
import Layout from "src/layout/DashboardLayout";
import styles from "/src/styles/Home.module.css";
import {
  ArrowUp,
  PlusLg,
  ArrowDownShort,
  ArrowUpShort,
} from "react-bootstrap-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import ModalTopUp from "src/components/ModalTopUp";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard, getHistory } from "src/redux/action/user";

function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const dataUser = useSelector((state) => state.user.data);
  const dashboard = useSelector((state) => state.user.dashboard);
  const history = useSelector((state) => state.user.history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboard(dataUser.id));
    dispatch(getHistory());
  }, []);

  const modalHandler = () => {
    setShowModal(false);
  };
  return (
    <Layout title="Home">
      <div className={styles.mainContainer}>
        <div className={`row ${styles.upperContainer}`}>
          <div
            className={`col-sm-12 col-md-6 col-lg-6 ${styles.leftContainer}`}
          >
            <div className={styles.balance}>Balance</div>
            <div className={styles.saldo}>
              Rp{dashboard.totalIncome - dashboard.totalExpense}
            </div>
            <div className={styles.phone}>
              {dataUser ? (
                dataUser.noTelp ? (
                  dataUser.noTelp
                ) : (
                  <div>&nbsp;</div>
                )
              ) : (
                <div>&nbsp;</div>
              )}
            </div>
          </div>
          <div
            className={`col-sm-12 col-md-6 col-lg-6 ${styles.rightContainer}`}
          >
            <div className={styles.button}>
              <ArrowUp />
              <div
                onClick={() => {
                  router.push("/transfer");
                }}
              >
                Transfer
              </div>
            </div>
            <div
              className={styles.button}
              onClick={() => {
                setShowModal(true);
              }}
            >
              <PlusLg />
              <div>Top Up</div>
            </div>
          </div>
        </div>
        <div className={`row ${styles.lowerContainer}`}>
          <div
            className={`col-sm-12 col-md-12 col-lg-6 ${styles.chartContainer}`}
          >
            <div className={styles.chartUpperContainer}>
              <div className={styles.incomeContainer}>
                <div className={styles.incomeLogo}>
                  <ArrowDownShort />
                </div>
                <div className={styles.text}>Income</div>
                <div className={styles.number}>Rp{dashboard.totalIncome}</div>
              </div>
              <div className={styles.expenseContainer}>
                <div className={styles.expenseLogo}>
                  <ArrowUpShort />
                </div>
                <div className={styles.text}>Expense</div>
                <div className={styles.number}>Rp{dashboard.totalExpense}</div>
              </div>
            </div>
            <div className={styles.chartLowerContainer}>
              <Image
                src={require("../../assets/vectors/chart.png")}
                alt="chart"
                className={styles.chart}
              />
            </div>
          </div>
          <div
            className={`col-sm-12 col-md-12 col-lg-6 ${styles.historyContainer}`}
          >
            <div className={styles.historyTitleContainer}>
              <div className={styles.transaction}>Transaction History</div>
              <div
                className={styles.seeAllButton}
                onClick={() => {
                  router.push("/home/history");
                }}
              >
                See all
              </div>
            </div>
            {history.length > 0
              ? history.map((item, index) => {
                  if (index > 3) {
                    return;
                  }
                  return (
                    <div className={styles.historyItemContainer} key={item.id}>
                      <div className={styles.historyImageContainer}>
                        <Image
                          src={
                            item.image
                              ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${item.image}`
                              : require("../../assets/images/background-1.png")
                          }
                          width={35}
                          height={35}
                          alt="profile"
                          className={styles.historyImage}
                        />
                      </div>
                      <div className={styles.historyProfile}>
                        <div
                          className={styles.historyName}
                        >{`${item.firstName} ${item.lastName}`}</div>
                        <div className={styles.historyType}>{item.type}</div>
                      </div>
                      <div
                        className={
                          item.type === "send"
                            ? styles.totalExpense
                            : styles.totalIncome
                        }
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
        </div>
      </div>
      <ModalTopUp showModal={showModal} modalHandler={modalHandler} />
    </Layout>
  );
}

export default Home;
