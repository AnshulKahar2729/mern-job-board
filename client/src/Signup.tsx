import React, { ChangeEvent, FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { redirect } from "react-router-dom";

interface SignupProps{
  closeModal : () => void;
}

const Signup: React.FC<SignupProps> = (SignupProps) => {
  const {closeModal} = SignupProps;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/api/register", {
        email,
        password,
        role,
      });

      localStorage.setItem("token", data);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <h1>Signup</h1>
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

export default Signup;
