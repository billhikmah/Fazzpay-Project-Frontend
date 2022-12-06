import styles from "src/components/ModalLogout/ModalLogout.module.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { X } from "react-bootstrap-icons";
import axios from "src/utility/axiosClient";
import Cookies from "js-cookie";

function ModalLogout(props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      await axios.post("/auth/logout");
      Cookies.remove("token");
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      Cookies.remove("token");
      setIsLoading(false);
    }
  };

  return (
    <Modal show={props.showModal} size="s" centered className="modal">
      <Modal.Title className={styles.modalTitle}>
        <div>Logout</div>
        <X className={styles.close} onClick={props.modalHandler} />
      </Modal.Title>
      <Modal.Body className={styles.modalBody}>
        <div>Are you sure to logout?</div>
        <div
          className={styles.buttonActive}
          onClick={() => {
            logoutHandler();
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
            "Logout"
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalLogout;
