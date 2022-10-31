import styles from "src/components/ModalTopUp/ModalTopUp.module.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { X } from "react-bootstrap-icons";
import axios from "src/utility/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "src/redux/action/user";
import { Toast, ToastContainer } from "react-bootstrap";

function ModalTopUp(props) {
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const topupHandler = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(`/transaction/top-up`, form);
      dispatch(getDashboard(id));
      window.open(result.data.data.redirectUrl, "_ blank");
      setIsLoading(false);
      setShowToast(true);
      props.modalHandler();
    } catch (error) {}
  };

  return (
    <>
      <Modal show={props.showModal} size="s" centered className="modal">
        <Modal.Title className={styles.modalTitle}>
          <div>Top Up</div>
          <X className={styles.close} onClick={props.modalHandler} />
        </Modal.Title>
        <Modal.Body className={styles.modalBody}>
          <div>Enter the amount of money, and click submit</div>
          <div className={styles.inputContainer}>
            <input
              type="number"
              className={styles.input}
              name="amount"
              onChange={formHandler}
            />
          </div>
          <div
            className={styles.buttonActive}
            onClick={() => {
              topupHandler();
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
              "Submit"
            )}
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer
        position="top-center"
        className="p-3 position-fixed toast-container"
      >
        <Toast
          show={showToast}
          onClose={() => {
            setShowToast(false);
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>Your balance has been updated</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ModalTopUp;
