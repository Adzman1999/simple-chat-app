import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import io from "socket.io-client";
const endpoint = "http://localhost:8000";
var socket;

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState("dark");
  const setMode = (mode) => {
    localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    savedTheme ? setTheme(savedTheme) : setMode("dark");
  }, [theme]);

  //=================================//

  // Preset

  const [colorPicker, setColorPicker] = useState();

  const setColorPreset = (color) => {
    localStorage.setItem("color", color);
    setColorPicker(color);
  };

  useEffect(() => {
    const savedColorPicker = localStorage.getItem("color");
    setColorPicker(savedColorPicker ? savedColorPicker : "secondary");
  }, [colorPicker]);

  // ===============================//

  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfos"));
    setUser(userInfo);

    if (!userInfo) navigate("/");
  }, [navigate]);

  useEffect(() => {
    socket = io(endpoint);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        setUser,
        user,
        notification,
        setNotification,
        chats,
        setChats,
        socket,
        socketConnected,
        setSocketConnected,
        setMode,
        theme,
        setTheme,
        setColorPreset,
        colorPicker,
        setColorPicker,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
