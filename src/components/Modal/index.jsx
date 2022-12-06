import styles from "src/components/Modal/ModalPin.module.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "src/utility/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "src/redux/action/user";

function ModalPin(props) {
  const router = useRouter();
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);

  const handleChange = async (e) => {
    await setPin({ ...pin, [e.target.id]: e.target.value });
  };
  const inputFocus = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 6) {
        e.target.form.elements[next].focus();
      }
    }
  };
  const confirmHandler = async () => {
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }
    try {
      setIsLoading(true);
      await axios.get(`/user/pin/${allPin}`);
      const form = { ...props.form, receiverId: props.id };
      const result = await axios.post(`/transaction/transfer`, form);
      // await dispatch(getDashboard(id));
      router.push(
        {
          pathname: `/transfer/result/${props.id}`,
          query: {
            amount: result.data.data.amount,
            balance: result.data.data.balance,
            notes: result.data.data.notes,
          },
        },
        `/transfer/result/${props.id}`
      );
      // setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={props.showModal} size="s" centered className="modal">
      <Modal.Title className={styles.modalTitle}>
        Enter PIN to Transfer
      </Modal.Title>
      <Modal.Body className={styles.modalBody}>
        <div>
          <div>
            Enter your 6 digits PIN for confirmation to continue transferring
            money.
          </div>
          <form>
            <div className="d-flex gap-3 justify-content-center">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item}>
                  <input
                    type="tel"
                    maxLength="1"
                    autoComplete="off"
                    className={styles.input}
                    style={{ width: "40px" }}
                    tabIndex={item}
                    id={`pin${item}`}
                    // value={[`${item}`]}
                    onChange={handleChange}
                    onKeyUp={inputFocus}
                  />
                </div>
              ))}
            </div>
            <div
              className={styles.modalButton}
              onClick={() => {
                if (
                  pin.pin1 &&
                  pin.pin2 &&
                  pin.pin3 &&
                  pin.pin4 &&
                  pin.pin5 &&
                  pin.pin6
                ) {
                  confirmHandler();
                }
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
                "Continue"
              )}
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalPin;
