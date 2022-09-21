import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/apiRequest";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
        }
        loginUser(newUser, dispatch, navigate)
    }

  return (
    <section className="login-container xl:h-[60vh] xl:flex xl:flex-col xl:items-center xl:justify-center">
      <div className="border border-solid border-gray-300 rounded-xl p-10">
          <div className="login-title text-center font-bold uppercase text-2xl my-4"> Log in</div>
          <form onSubmit={handleLogin} className="flex flex-col">
            <label className="mb-2 font-semibold tracking-wider">USERNAME</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter your username" className="mb-2 border border-solid border-gray-200 rounded p-2" />
            <label className="mb-2 font-semibold tracking-wider">PASSWORD</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" className="mb-2 border border-solid border-gray-200 rounded p-2" />
            <button type="submit" className="mb-2 font-semibold tracking-wider bg-gray-300 rounded-xl py-1 text-white hover:bg-black my-4">Continue</button>
          </form>
          <div className="login-register"> Don't have an account yet? </div>
          <Link className="login-register-link text-blue-500 hover:underline" to="/register">
            Register one for free{" "}
          </Link>
      </div>
    </section>
  );
}

export default Login;
