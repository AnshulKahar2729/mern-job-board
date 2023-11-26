import React, { useEffect, useState } from "react";
import IndexHeader from "../components/indexHeader";
import Footer from "../components/footer";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import axios from "axios";
import { createPortal } from "react-dom";
import Login from "../Login";

const IndexPage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("IndexPage");
    console.log(user);

    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      const { data } = await axios.get("http://localhost:4000/api/profile", {
        headers: {
          authoirzation: `Bearer ${token}`,
        },
      });

      console.log(data);
      setUser(data);
    };

    if (token) fetchUser();
  }, []);

  return (
    <div>
      <IndexHeader
        onSignUpClick={() => {
          setShowModal(!showModal);
        }}
      />
      <Footer />
      {showModal && createPortal(<Login />, document.getElementById("modal"))}
    </div>
  );
};

export default IndexPage;
