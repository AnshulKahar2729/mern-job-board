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
import Hero from "../components/Hero";

const IndexPage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);

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
    <div className="h-[200vh] bg-[#F6F7FA]">

      {<IndexHeader
        onSignUpClick={() => {
          setLoginModal(false);
          setShowModal(!showModal);
        }}
        onLoginClick={() => {
          setLoginModal(true);
          setShowModal(!showModal);
        }}
      />}
      <div className="">
        <Hero/>
      </div>
      
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
          document.getElementById("modal")!
        )}
    </div>
  );
};

export default IndexPage;
