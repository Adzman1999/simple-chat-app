import React, { useEffect, useState, Fragment } from "react";
import {
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Stack,
} from "@mui/material";
import ChatBox from "./ChatBox";
import {
  fetchAllChats,
  fetchAllMessages,
  leaveGroup,
  sendMessage,
} from "../../actions/ChatAction";

import { ChatState } from "../../context/ChatProvider";
import { getSender, getSenderPic } from "../../config/ChatConfig";
import {
  ArrowBackRounded,
  ChatBubbleOutlineTwoTone,
  MoreVert,
  SendOutlined,
} from "@mui/icons-material";
import LoadingChat from "./LoadingChat";
import EditGroupModal from "./EditGroupModal";
import MemberListModal from "./MemberListModal";
import AddMemberModal from "./AddMemberModal";
import { red } from "@mui/material/colors";
var selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    socket,
    socketConnected,
  } = ChatState();

  useEffect(() => {
    fetchAllMessages(user, selectedChat, setLoading, setMessages, socket);
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(
      user,
      selectedChat,
      setMessages,
      setNewMessage,
      newMessage,
      messages,
      socket
    );
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const menuId = "primary-search-account-menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const getMessages = () => {
    fetchAllChats(user, selectedChat, setLoading, setMessages, socket);
  };

  const groupData = [
    {
      id: "Edit Group",
      event: (
        <EditGroupModal
          handleMenuClose={handleMenuClose}
          setFetchAgain={setFetchAgain}
          fetchAgain={fetchAgain}
        />
      ),
    },
    {
      id: "Add Member",
      event: (
        <AddMemberModal
          handleMenuClose={handleMenuClose}
          setFetchAgain={setFetchAgain}
          fetchAgain={fetchAgain}
        />
      ),
    },
    {
      id: "Member List",
      event: (
        <MemberListModal
          handleMenuClose={handleMenuClose}
          setFetchAgain={setFetchAgain}
          fetchAgain={fetchAgain}
          getMessages={getMessages}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <Card
        elevation={0}
        sx={{
          width: "100%",
          background: "transparent",
          mb: 3,
          display: "flex",
          flexDirection: "column",
        }}>
        {selectedChat ? (
          <>
            <Card
              elevation={0}
              sx={{
                background: "transparent",
                pt: { xs: 0, md: 2 },
                pb: 2,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  className='sub-text-color'
                  onClick={() => setSelectedChat("")}>
                  <ArrowBackRounded />
                </IconButton>
              </Box>

              {messages &&
                (!selectedChat.isGroupChat ? (
                  <>
                    <Typography
                      className='sub-text-color'
                      variant='title1'
                      sx={{ fontWeight: 600, textTransform: "capitalize" }}>
                      {getSender(user, selectedChat.users)}
                    </Typography>

                    <Avatar
                      className='sub-part-bg'
                      alt={getSender(user, selectedChat.users)}
                      src={getSenderPic(user, selectedChat.users)}
                      sx={{ textTransform: "capitalize" }}
                    />
                  </>
                ) : (
                  <>
                    <Typography
                      className='sub-text-color'
                      variant='title1'
                      sx={{ fontWeight: 600, textTransform: "uppercase" }}>
                      {selectedChat.chatName}
                    </Typography>
                    {/* more  */}
                    <IconButton
                      className='sub-text-color'
                      aria-label='account of current user'
                      aria-controls={menuId}
                      aria-haspopup='true'
                      onClick={handleProfileMenuOpen}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      id={menuId}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={isMenuOpen}
                      onClose={handleMenuClose}>
                      {groupData.map((item) => (
                        <MenuItem key={item.id}>{item.event}</MenuItem>
                      ))}
                      <MenuItem
                        sx={{ color: red[500] }}
                        onClick={() =>
                          leaveGroup(
                            user,
                            selectedChat,
                            setSelectedChat,
                            setFetchAgain,
                            fetchAgain,
                            getMessages,
                            handleMenuClose
                          )
                        }>
                        Leave Group
                      </MenuItem>
                    </Menu>
                  </>
                ))}
            </Card>
            <Card
              className='sub-part-bg'
              elevation={0}
              sx={{
                // height: { xs: "100%", md: 395 },
                // maxHeight: { xs: "100%", md: 395 },
                flex: 1,
                overflowX: "scroll",
                overflowY: "scroll",
                "::-webkit-scrollbar ": {
                  width: "0px",
                  height: "6px",
                },
                "::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(86, 41, 107, 0.199)",
                  borderRadius: "10px",
                },
                borderRadius: "16px 16px 0px 0px",
                pr: { xs: 0, md: 3 },
                pl: { xs: 0, md: 3 },
                pb: 0,
                pt: 0,
                justifyContent: "flex-end",
                flexDirection: "column",
                // position: "relative",
              }}>
              {loading ? (
                <LoadingChat />
              ) : (
                <>
                  <ChatBox messages={messages} />
                </>
              )}
            </Card>
            <Card
              // sx={{ position: "fixed", bottom: 0, zIndex: 1000 }}
              className='sub-bg'
              elevation={0}
              component='form'
              onSubmit={handleSubmit}
              id='first-name'
              isRequired
              mt={3}>
              {isTyping ? (
                // <div>
                //   <Lottie
                //     options={defaultOptions}
                //     // height={50}
                //     width={70}
                //     style={{ marginBottom: 15, marginLeft: 0 }}
                //   />
                // </div>
                <Typography variant='body2' className='main-text-color'>
                  Typing...
                </Typography>
              ) : (
                <></>
              )}
              <TextField
                placeholder='Type a message..'
                value={newMessage}
                onChange={typingHandler}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton type='submit' className='sub-text-color'>
                        <SendOutlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Card>
          </>
        ) : (
          // to get socket.io on same page
          <Card
            elevation={0}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "transparent",
            }}>
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}
              className='sub-text-color'
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontSize: "25px",
                p: 2,
              }}>
              <ChatBubbleOutlineTwoTone />
              <Typography>No Messages Yet</Typography>
            </Stack>
          </Card>
        )}
      </Card>
    </Fragment>
  );
};

export default SingleChat;
