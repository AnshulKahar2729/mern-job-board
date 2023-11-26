import React, { useEffect } from "react";
import IndexHeader from "../components/indexHeader";
import Footer from "../components/footer";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import axios from "axios";

const IndexPage = () => {
  const [user, setUser] = useRecoilState(userAtom);

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
      <IndexHeader />
      <Footer />
    </div>
  );
};

export default IndexPage;
