import React, { useEffect } from "react";
import Layout from "src/layout/DashboardLayout";
import styles from "/src/styles/History.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "src/redux/action/user";
import { useState } from "react";

function History() {
  const history = useSelector((state) => state.user.history);
  const [filter, setFilter] = useState("WEEK");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    getHistoryHandler();
  }, [filter, page]);

  const getHistoryHandler = async () => {
    try {
      const result = await dispatch(getHistory(page, 5, filter));
      setTotalPage(result.action.payload.data.pagination.totalPage);
    } catch (error) {}
  };
  const filterHandler = (e) => {
    setPage(1);
    setFilter(e.target.value);
  };
  const prevHandler = (e) => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };
  const nextHandler = (e) => {
    if (page === totalPage) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <Layout title="History">
      <div className={styles.mainContainer}>
        <div className={styles.historyTitleContainer}>
          <div className={styles.transaction}>Transaction History</div>
          <div className={styles.seeAllButton}>
            <select
              name="filter"
              id="filter"
              onChange={filterHandler}
              value={filter}
              className={styles.seeAllButton}
            >
              <option value="WEEK">Weekly</option>
              <option value="MONTH">Monthly</option>
              <option value="YEAR">Yearly</option>
            </select>
          </div>
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
        <div className={styles.pagination}>
          <div className={styles.paginationButton} onClick={prevHandler}>
            prev
          </div>
          <div>
            {page}/{totalPage}
          </div>
          <div className={styles.paginationButton} onClick={nextHandler}>
            next
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default History;
