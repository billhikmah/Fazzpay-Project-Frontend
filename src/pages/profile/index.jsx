import React, { useEffect, useState } from "react";
import Layout from "src/layout/DashboardLayout";
import styles from "/src/styles/Profile.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "src/utility/axiosClient";
import { ArrowRight, Pencil, Trash } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteImage, getUserAction, updateImage } from "src/redux/action/user";
import ModalLogout from "src/components/ModalLogout";

function Profile() {
  const user = useSelector((state) => state.user.data);
  const [form, setForm] = useState({});
  const [upload, setUpload] = useState("");
  const [uploadImage, setUploadImage] = useState(false);
  const [deleteImageProcess, setDeleteImageProcess] = useState(false);
  const [showModalLogout, setShowModalLogout] = useState(false);
  const id = useSelector((state) => state.user.id);
  const router = useRouter();
  const dispatch = useDispatch();

  const formHandler = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.files[0] });
    setUpload(URL.createObjectURL(e.target.files[0]));
  };
  const uploadHandler = async (e) => {
    try {
      setUploadImage(true);
      e.preventDefault();
      const formData = new FormData();
      for (const data in form) {
        formData.append(data, form[data]);
      }
      await dispatch(updateImage(formData, id));
      await dispatch(getUserAction(id));
      setForm({});
      setUpload("");
      setUploadImage(false);
    } catch (error) {
      setForm({});
      setUpload("");
      setUploadImage(false);
    }
  };
  const deleteHandler = async () => {
    try {
      console.log("first");
      setDeleteImageProcess(true);
      await dispatch(deleteImage(id));
      await dispatch(getUserAction(id));
      setDeleteImageProcess(false);
    } catch (error) {
      setDeleteImageProcess(false);
    }
  };
  const modalLogoutHandler = () => {
    setShowModalLogout(false);
  };

  return (
    <Layout title="Profile">
      <div className={styles.mainContainer}>
        <div className={styles.profileContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={
                user.image
                  ? upload
                    ? upload
                    : `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${user.image}`
                  : require("src/assets/images/background-1.png")
              }
              alt="profile"
              className={styles.image}
              width={80}
              height={80}
            />
          </div>
          {!upload ? (
            <label className={styles.editContainer} htmlFor="image">
              <Pencil />
              <div>Edit</div>
              <input
                type="file"
                id="image"
                name="image"
                className="d-none"
                onChange={formHandler}
              />
            </label>
          ) : uploadImage ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className={styles.buttonContainer}>
              <div className={styles.editContainer} onClick={uploadHandler}>
                Save
              </div>
              <div
                onClick={() => {
                  setForm({});
                  setUpload("");
                }}
                className={styles.editContainer}
              >
                Cancel
              </div>
            </div>
          )}
          <div className={styles.editContainer} onClick={deleteHandler}>
            <Trash />
            {deleteImageProcess ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div>Delete</div>
            )}
          </div>

          <div className={styles.name}>
            {user.firstName} {user.lastName}
          </div>
          <div className={styles.phone}>{user.noTelp}</div>
        </div>
        <div className={styles.navigation}>
          <div
            className={styles.navigationItem}
            onClick={() => {
              router.push("profile/personal");
            }}
          >
            <div>Personal Information</div>
            <ArrowRight />
          </div>
          <div
            className={styles.navigationItem}
            onClick={() => {
              router.push("profile/update/password");
            }}
          >
            <div>Change Password</div>
            <ArrowRight />
          </div>
          <div
            className={styles.navigationItem}
            onClick={() => {
              router.push("profile/update/pin");
            }}
          >
            <div>Change Pin</div>
            <ArrowRight />
          </div>
          <div
            className={styles.navigationItem}
            onClick={() => {
              setShowModalLogout(true);
            }}
          >
            <div>Logout</div>
          </div>
        </div>
      </div>
      <ModalLogout
        showModal={showModalLogout}
        modalHandler={modalLogoutHandler}
      />
    </Layout>
  );
}

export default Profile;
