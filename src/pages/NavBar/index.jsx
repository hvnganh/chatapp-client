import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/apiRequest";
import { logOutSuccess } from "../../store/authSlice";
import { createAxios } from "../../createInstance";

function NavBar() {
  const user = useSelector(state => state.auth.login.currentUser);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = user?.accessToken
  const id = user?._id;
  let axiosJWT = createAxios(user, dispatch, logOutSuccess)
  const handleLogOut = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT)
  }
  
  return (
    <nav className="xl:flex xl:items-center xl:justify-center xl:h-20 border-b border-gray-300 border-solid">
      <Link to="/" className="navbar-home text-lg font-bold hover:px-3 hover:py-2 hover:bg-gray-300 hover:rounded-xl xl:mx-5">
        {" "}
        Home{" "}
      </Link>
      {user ? (
        <>
          <p className="navbar-user text-lg font-bold hover:p-4 hover:px-3 hover:py-2 hover:bg-gray-300 hover:rounded-xl xl:mx-5">
            Hi, <span> {user.username} </span>{" "}
          </p>
          <Link to="/logout" onClick={handleLogOut} className="navbar-logout text-lg font-bold hover:p-4 hover:px-3 hover:py-2 hover:bg-gray-300 hover:rounded-xl xl:mx-5">
            {" "}
            Log out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login text-lg font-bold hover:p-4 hover:px-3 hover:py-2 hover:bg-gray-300 hover:rounded-xl xl:mx-5">
            {" "}
            Login{" "}
          </Link>
          <Link to="/register" className="navbar-register text-lg font-bold hover:p-4 hover:px-3 hover:py-2 hover:bg-gray-300 hover:rounded-xl xl:mx-5">
            {" "}
            Register
          </Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
