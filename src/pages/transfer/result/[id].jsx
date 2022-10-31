import Layout from "src/layout/DashboardLayout";
import styles from "src/styles/Result.module.css";
import { CheckCircleFill, Download } from "react-bootstrap-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "src/utility/axiosClient";

function Transfer(props) {
  const router = useRouter();
  const data = router.query;
  const [receiver, setReceiver] = useState({});

  useEffect(() => {
    getReceiverData();
  }, []);

  const getReceiverData = async () => {
    const result = await axios.get(`/user/profile/${data.id}`);
    setReceiver(result.data.data);
  };

  return (
    <Layout title="Transfer">
      <main className={styles.mainContainer}>
        <div className={styles.header}>
          <CheckCircleFill />
        </div>
        <div className={styles.headerTitle}>Transfer Success</div>
        <div className={styles.valueContainer}>
          <div className={styles.valueTitle}>Amount</div>
          <div className={styles.value}>Rp{data.amount}</div>
        </div>
        <div className={styles.valueContainer}>
          <div className={styles.valueTitle}>Balance Left</div>
          <div className={styles.value}>Rp{data.balance}</div>
        </div>
        <div className={styles.valueContainer}>
          <div className={styles.valueTitle}>Date & Time</div>
          <div className={styles.value}>Oct 31, 2022</div>
        </div>
        <div className={styles.valueContainer}>
          <div className={styles.valueTitle}>Notes</div>
          <div className={styles.value}>{data.notes}</div>
        </div>
        <div className={styles.title}>Transfer to</div>
        <div
          className={styles.transferItemContainer}
          onClick={() => {
            router.push("/transfer/1");
          }}
        >
          <div className={styles.transferImageContainer}>
            <Image
              src={
                receiver.image
                  ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${receiver.image}`
                  : require("../../../assets/images/background-1.png")
              }
              alt="profile"
              width={35}
              height={35}
              className={styles.transferImage}
            />
          </div>
          <div className={styles.transferProfile}>
            <div className={styles.transferName}>
              {receiver ? (
                `${receiver.firstName} ${receiver.lastName}`
              ) : (
                <div>&nbsp;</div>
              )}
            </div>
            <div className={styles.transferType}>
              {receiver ? receiver.noTelp : <div>&nbsp;</div>}
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.download}>
            <Download />
            {"    "}
            Download PDF
          </div>
          <div
            className={styles.back}
            onClick={() => {
              router.push("/home");
            }}
          >
            Back to Home
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Transfer;
