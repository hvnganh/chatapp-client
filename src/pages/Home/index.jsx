import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../store/apiRequest";
import { loginSuccess } from "../../store/authSlice";
import { createAxios } from "../../createInstance";
import io from "socket.io-client";
import Chat from "../../components/Chat";

const socket = io.connect("http://localhost:8000");

function Home() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  // const userList = useSelector((state) => state.users.users?.allUsers);
  // console.log(userList)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [username, setUsername] = useState();
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  console.log("after", user);
  return (
    <div className="chat-app text-center mt-10 flex items-center justify-center">
      {!showChat ? (
        <div className="flex flex-col max-w-7xl joinChatContainer border border-gray-300 border-solid rounded-xl p-4">
          <h3 className="text-2xl font-bold my-4">Join A Chat</h3>
          <input
            className="border border-solid border-gray-200 rounded-lg p-2 text-lg my-2"
            type="text"
            placeholder="Alias..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            className="border border-solid border-gray-200 rounded-lg p-2 text-lg my-2"
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button className="text-lg font-bold p-4 px-3 py-2 hover:p-4 hover:px-3 hover:py-2 hover:bg-gray-300 hover:rounded-xl" onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Home;
