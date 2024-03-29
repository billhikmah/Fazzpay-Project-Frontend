import React, { useEffect, useState } from "react";
import Layout from "src/layout/DashboardLayout";
import styles from "/src/styles/Transfer.module.css";
import Image from "next/image";
import { Search } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import axios from "src/utility/axiosClient";

function Transfer() {
  const [key, setKey] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchStatus, setSearchStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (key === "") {
      setSearchStatus(false);
      setUsers([]);
      return;
    }
    getUsersData();
  }, [key, page]);

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

  const getUsersData = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `/user?page=${page}&limit=4&search=${key}&sort=firstName ASC`
      );
      setUsers(result.data.data);
      setTotalPage(result.data.pagination.totalPage);
      setIsLoading(false);
      if (result.data.data.length === 0) {
        setSearchStatus(false);
        return;
      }
      setSearchStatus(true);
    } catch (error) {
      setUsers([]);
      setIsLoading(false);
    }
  };
  const router = useRouter();
  return (
    <Layout title="Transfer">
      <div className={styles.mainContainer}>
        <div className={styles.transferTitleContainer}>
          <div className={styles.transaction}>Search Receiver</div>
          <div className={styles.searchContainer}>
            <Search />
            <input
              type="text"
              className={styles.input}
              placeholder="Search receiver here"
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
          </div>
        </div>
        {users.length > 0
          ? users.map((item) => {
              return (
                <div
                  key={item.id}
                  className={styles.transferItemContainer}
                  onClick={() => {
                    router.push(`/transfer/${item.id}`);
                  }}
                >
                  <div className={styles.transferImageContainer}>
                    <Image
                      src={
                        item.image
                          ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${item.image}`
                          : require("../../assets/images/background-1.png")
                      }
                      alt="profile"
                      width={35}
                      height={35}
                      className={styles.transferImage}
                    />
                  </div>
                  <div className={styles.transferProfile}>
                    <div
                      className={styles.transferName}
                    >{`${item.firstName} ${item.lastName}`}</div>
                    <div className={styles.transferType}>
                      {item.noTelp ? item.noTelp : <div>&nbsp;</div>}
                    </div>
                  </div>
                </div>
              );
            })
          : ""}

        <div className={searchStatus ? styles.pagination : styles.none}>
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

export default Transfer;
