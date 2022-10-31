import Image from "next/image";
import React, { useEffect, useState } from "react";
import Layout from "src/layout/DashboardLayout";
import styles from "src/styles/TransferDetail.module.css";
import { Pencil } from "react-bootstrap-icons";
import Modal from "src/components/Modal";
import { useRouter } from "next/router";
import axios from "src/utility/axiosClient";
import { useSelector } from "react-redux";

function Transfer() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const dashboard = useSelector((state) => state.user.dashboard);

  useEffect(() => {
    getUserById();
  });

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const getUserById = async () => {
    try {
      const result = await axios.get(`/user/profile/${id}`);
      setUser(result.data.data);
    } catch (error) {
      setUser({});
    }
  };
  const balanceHandler = (e) => {
    if (e.target.value > dashboard.totalIncome - dashboard.totalExpense) {
      return setErrorMessage("Your balance is not sufficient");
    }
    setErrorMessage("");
  };
  const modalHandler = () => {
    setShowModal(false);
  };

  return (
    <Layout title="Transfer">
      <main className={styles.mainContainer}>
        <div className={styles.transferTitleContainer}>
          <div className={styles.transaction}>Transfer Money</div>
        </div>
        <div className={styles.transferItemContainer}>
          <div className={styles.transferImageContainer}>
            <Image
              src={
                user.image
                  ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${user.image}`
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
            >{`${user.firstName} ${user.lastName}`}</div>
            <div className={styles.transferNumber}>
              {user.noTelp ? user.noTelp : <div>&nbsp;</div>}
            </div>
          </div>
        </div>
        <div className={`col-sm-12 col-md-12 col-lg-6 ${styles.text}`}>
          Type the amount you want to transfer and then press continue to the
          next steps.
        </div>
        <div className={styles.inputContainer}>
          <input
            type="number"
            className={styles.input}
            placeholder="Rp0.00"
            name="amount"
            onChange={(e) => {
              formHandler(e);
              balanceHandler(e);
            }}
          />
          <div className={styles.saldo}>
            Rp{dashboard.totalIncome - dashboard.totalExpense} Available
          </div>
          <div className={styles.notesContainer}>
            <Pencil />
            <input
              type="text"
              className={styles.notes}
              placeholder="Add some notes"
              name="notes"
              onChange={(e) => {
                formHandler(e);
              }}
            />
          </div>
          {errorMessage ? errorMessage : <div>&nbsp;</div>}
        </div>
        <div
          className={styles.continueButton}
          onClick={() => {
            if (errorMessage) {
              return;
            }
            if (!form.amount) {
              return;
            }
            setShowModal(true);
          }}
        >
          Continue
        </div>
      </main>
      <Modal
        showModal={showModal}
        modalHandler={modalHandler}
        form={form}
        id={id}
      />
    </Layout>
  );
}

export default Transfer;
