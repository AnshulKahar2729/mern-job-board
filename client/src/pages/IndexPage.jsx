import React, { useEffect, useState } from "react";
import IndexHeader from "../components/indexHeader";
import Footer from "../components/footer";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import axios from "axios";
import { createPortal } from "react-dom";
import Login from "../Login";
import OverlayModal from "../components/Overlay/OverlayModal";
import Signup from "../Signup";

const IndexPage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [showModal, setShowModal] = useState(false);
  const [loginModal, setLoginModal] = useState(null);

  useEffect(() => {
    console.log("IndexPage");
    console.log(user);

    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/profile", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        console.log(data);
        setUser(data);
        console.log(user);
      } catch (error) {
        console.log("Error from /profile");
        console.log(error);
      }
    };

    if (token) fetchUser();
  }, [showModal]);

  return (
    <div>
      <IndexHeader
        onSignUpClick={() => {
          setLoginModal(false);
          setShowModal(!showModal);
        }}
        onLoginClick={() => {
          setLoginModal(true);
          setShowModal(!showModal);
        }}
      />
      {user && <h1>{user.email} {user.id} {user.role}</h1>}
      <Footer />
      {showModal &&
        createPortal(
          <OverlayModal onClose={() => setShowModal(!showModal)}>
            {loginModal ? (
              <Login
                closeModal={() => {
                  setShowModal(!showModal);
                }}
              />
            ) : (
              <Signup
                closeModal={() => {
                  setShowModal(!showModal);
                }}
              />
            )}
          </OverlayModal>,
          document.getElementById("modal")
        )}
    </div>
  );
};

export default IndexPage;
