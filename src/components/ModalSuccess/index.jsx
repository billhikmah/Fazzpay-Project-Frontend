import styles from "src/components/ModalSuccess/ModalSuccess.module.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { X } from "react-bootstrap-icons";

function ModalSuccess(props) {
  const router = useRouter();

  return (
    <Modal show={props.showModal} size="s" centered className="modal">
      <Modal.Title className={styles.modalTitle}>
        <div>Success!</div>
        {/* <X className={styles.close} onClick={props.modalHandler()} /> */}
      </Modal.Title>
      <Modal.Body className={styles.modalBody}>
        <div>
          Congratulations! Your account has been created. Please check your
          email to activate your account.
        </div>
        <div
          className={styles.buttonActive}
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Login
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalSuccess;
