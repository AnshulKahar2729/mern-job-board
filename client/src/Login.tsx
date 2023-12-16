import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  closeModal: () => void;
}

const Login: React.FC<LoginProps> = (LoginProps) => {
  const { closeModal } = LoginProps;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
        role,
      });

      localStorage.setItem("token", data);
      closeModal();
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" ">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={{ display: "block" }}
          value={email}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          type="email"
          placeholder="Enter email"
        />
        <input
          style={{ display: "block" }}
          value={password}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
          type="password"
          placeholder="Enter password"
        />
        <input
          style={{ display: "block" }}
          value={role}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setRole(event.target.value)
          }
          type="text"
          placeholder="Role"
        />
        <button className="bg-white" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
