import axios from "axios";

export const searchUser = async (search, user, setSearchResult, setLoading) => {
  setLoading(true);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`/api/user?search=${search}`, config);
    setSearchResult(data);
    setLoading(false);
  } catch (error) {
    alert("Cannot Fetch API");
    setLoading(false);
  }
};

export const accessChat = async (
  userId,
  user,
  setSelectedChat,
  setChats,
  chats,
  handleClose
) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(`/api/chat/create`, { userId }, config);

    if (chats.find((chat) => chat._id === data._id)) setChats([data, ...chats]);
    setSelectedChat(data);
    handleClose();
  } catch (error) {
    alert("No message had been made yet");
  }
};

export const fetchAllChats = async (user, setChats) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get("/api/chat", config);
    setChats(data);
  } catch (error) {
    alert("Cannot Fetch API");
  }
};

export const createAGroupChat = async (
  user,
  setChats,
  chats,
  groupChatName,
  selectedUsers,
  handleClose,
  setSelectedUsers,
  setSearch
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/chat/group`,
      {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      },
      config
    );
    setChats([data, ...chats]);
    setSelectedUsers([]);
    setSearch("");
    handleClose();
  } catch (error) {
    alert("Cannot Fetch API");
  }
};

export const fetchAllMessages = async (
  user,
  selectedChat,
  setLoading,
  setMessages,
  socket
) => {
  if (!selectedChat) return;
  setLoading(true);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/message/${selectedChat._id}`,
      config
    );
    setMessages(data);
    setLoading(false);

    socket.emit("join chat", selectedChat._id);
  } catch (error) {
    alert("Cannot Fetch API");
    setLoading(false);
  }
};

export const sendMessage = async (
  user,
  selectedChat,
  setMessages,
  setNewMessage,
  newMessage,
  messages,
  socket
) => {
  socket.emit("stop typing", selectedChat._id);
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/message",
      {
        content: newMessage,
        chatId: selectedChat,
      },
      config
    );
    socket.emit("new message", data);
    setNewMessage("");
    setMessages([...messages, data]);
  } catch (error) {
    alert("Cannot Fetch API");
  }
};

export const updateGroupChat = async (
  user,
  groupChatName,
  selectedChat,
  setSelectedChat,
  setFetchAgain,
  fetchAgain,
  handleClose,
  setGroupChatName
) => {
  if (!groupChatName) return;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/chat/rename`,
      {
        chatId: selectedChat._id,
        chatName: groupChatName,
      },
      config
    );
    setSelectedChat(data);
    setFetchAgain(!fetchAgain);
    setGroupChatName("");
    handleClose();
    alert("Updated Successfully!");
  } catch (error) {
    alert("Cannot Fetch API");
  }
};

export const addUserToGroup = async (
  userID,
  user,
  selectedChat,
  setSelectedChat,
  setFetchAgain,
  fetchAgain,
  setLoading
) => {
  try {
    if (selectedChat.length === 0) {
      alert("No user selected");
      return;
    } else if (selectedChat.users.find((u) => u._id === userID._id)) {
      alert("User already in group");
      return;
    } else {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/group-add`,
        {
          chatId: selectedChat._id,
          userId: userID._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    }
  } catch (error) {
    alert("Cannot add user, try again");
  }
};

export const leaveGroup = async (
  user,
  selectedChat,
  setSelectedChat,
  setFetchAgain,
  fetchAgain,
  getMessages,
  handleMenuClose
) => {
  try {
    if (selectedChat.groupAdmin.admin !== user._id) {
      alert("Only admins can remove someone!");
      return;
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/group-remove`,
        {
          chatId: selectedChat._id,
          userId: user._id,
        },
        config
      );

      // user._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      getMessages();
      handleMenuClose();
    }
  } catch (error) {
    alert("Cannot Fetch API");
  }
};

export const removeUserFromGroup = async (
  u,
  user,
  selectedChat,
  setSelectedChat,
  setFetchAgain,
  fetchAgain,
  getMessages
) => {
  try {
    if (selectedChat.groupAdmin.admin !== user._id && u._id !== user._id) {
      alert("Only admins can remove someone!");
      return;
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/group-remove`,
        {
          chatId: selectedChat._id,
          userId: u._id,
        },
        config
      );

      u._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      getMessages();
    }
  } catch (error) {}
};
