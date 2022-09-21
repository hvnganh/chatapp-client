import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/apiRequest";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser ={
      username,
      password,
      email,
    }
    registerUser(newUser, dispatch, navigate)
  };

  return (
    <section className="register-container xl:h-[60vh] xl:flex xl:flex-col xl:items-center xl:justify-center">
      <div className="border border-solid border-gray-300 rounded-xl p-10">
        <div className="register-title text-center font-bold uppercase text-2xl my-4">
          {" "}
          Sign up{" "}
        </div>
        <form onSubmit={handleRegister} className="flex flex-col">
          <label className="mb-2 font-semibold tracking-wider">EMAIL</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your email"
            className="mb-2 border border-solid border-gray-200 rounded p-2"
          />
          <label className="mb-2 font-semibold tracking-wider">USERNAME</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your username"
            className="mb-2 border border-solid border-gray-200 rounded p-2"
          />
          <label className="mb-2 font-semibold tracking-wider">PASSWORD</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="mb-2 border border-solid border-gray-200 rounded p-2"
          />
          <button
            type="submit"
            className="mb-2 font-semibold tracking-wider bg-gray-300 rounded-xl py-1 text-white hover:bg-black my-4"
          >
            {" "}
            Create account{" "}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
