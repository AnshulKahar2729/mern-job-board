import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import axios from "axios";

const useFetchUserDetails = () => {
  const [user, setUser] = useState({
    id: "",
    token: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  //   const [user, setUser] = React.useState(null)
  const setUserDetails = useSetRecoilState(userAtom);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("http://localhost:4000/api/profile", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser({ id: data.id, token: data.token, email: data.email });
        setUserDetails({ id: data.id, token: data.token, email: data.email });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchUserDetails();
  }, []);

  return { isLoading, user };
};

export default useFetchUserDetails;
