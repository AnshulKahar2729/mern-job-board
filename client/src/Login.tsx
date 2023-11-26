import React, { ChangeEvent, FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
        role,
      });

      localStorage.setItem("token", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" fixed top-1 bg-black" style={{width : "50vw", height : "50vh"}}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
