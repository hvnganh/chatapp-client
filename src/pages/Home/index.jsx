import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../store/apiRequest'
import { loginSuccess } from '../../store/authSlice'
import { createAxios } from '../../createInstance';

function Home() {
  const user = useSelector((state) => state.auth.login?.currentUser)
  // const userList = useSelector((state) => state.users.users?.allUsers);
  // console.log(userList)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT)
    }
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home