import { Avatar, Box, Card, Stack, Typography, Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { fetchAllChats } from "../../actions/ChatAction";
import { getSender, getSenderPic } from "../../config/ChatConfig";
import { ChatState } from "../../context/ChatProvider";
import CreateGroupChatModal from "./CreateGroupChatModal";

const Sidebar = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfos")));
    fetchAllChats(user, setChats);
  }, [fetchAgain]);

  return (
    <Fragment>
      <Card
        className='sub-bg'
        elevation={0}
        sx={{
          maxHeight: "80vh",
          height: "80vh",
          width: 400,
          borderRadius: 3,
          overflowX: "hidden",
          overflowY: "scroll",
          "::-webkit-scrollbar ": {
            width: "0px",
          },
          display: { xs: "none", md: "block" },
          position: "relative",
          pr: 2,
          pl: 2,
          pt: 0,
          pb: 2,
        }}>
        <Card
          elevation={0}
          className='sub-bg'
          sx={{
            position: "sticky",
            top: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 2,
            pb: 1,
            borderRadius: 0,
            zIndex: 200,
          }}>
          <Typography
            variant='body1'
            className='sub-text-color'
            sx={{ fontWeight: 600 }}>
            My Chat
          </Typography>
          <CreateGroupChatModal />
        </Card>
        <Grid spacing={2} container mt={0.5}>
          {chats
            ? chats.map((chat) => (
                <Grid item md={12}>
                  <Card
                    className={
                      selectedChat === chat ? "btn-bg-active" : "btn-bg"
                    }
                    elevation={0}
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    sx={{
                      height: 45,
                      maxHeight: 45,
                      display: "flex",
                      gap: 3,
                      borderRadius: 3,
                      cursor: "pointer",
                      p: 2,
                      position: "relative",
                    }}>
                    <Stack spacing={2} direction='row' alignItems='center'>
                      <Box>
                        {!chat.isGroupChat ? (
                          <Avatar
                            className='sub-bg'
                            alt={getSender(loggedUser, chat.users)}
                            src={getSenderPic(loggedUser, chat.users)}
                            sx={{ textTransform: "capitalize" }}
                          />
                        ) : (
                          <Avatar
                            className='sub-bg'
                            alt={chat.chatName}
                            src={chat.groupAdmin && chat.groupAdmin.pic}
                            sx={{ textTransform: "capitalize" }}
                          />
                        )}
                      </Box>
                      <Stack>
                        <Typography
                          variant='body1'
                          sx={{
                            fontWeight: 600,
                          }}>
                          {!chat.isGroupChat
                            ? getSender(loggedUser, chat.users)
                            : chat.chatName}
                        </Typography>

                        {chat.latestMessage && (
                          <>
                            <Box
                              sx={{
                                display:
                                  !chat.isGroupChat &&
                                  chat.latestMessage.sender._id === user._id
                                    ? "flex"
                                    : "block",
                                gap: 1,
                              }}>
                              <Typography>
                                {!chat.isGroupChat &&
                                chat.latestMessage.sender._id === user._id ? (
                                  <Typography
                                    variant='body2'
                                    sx={{
                                      fontWeight: 600,
                                    }}>
                                    You:
                                  </Typography>
                                ) : (
                                  <></>
                                )}
                              </Typography>
                              <Typography variant='body2'>
                                {chat.latestMessage.content.length > 15
                                  ? chat.latestMessage.content.substring(
                                      0,
                                      15
                                    ) + "..."
                                  : chat.latestMessage.content}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  position: "absolute",
                                  bottom: 2,
                                  right: 10,
                                }}>
                                {String(chat.createdAt).substring(0, 10)}
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              ))
            : "loading"}
        </Grid>
      </Card>
      {/*====================== Mobile =======================*/}
      <Grid
        spacing={2}
        container
        sx={{
          overflowX: "hidden",
          overflowY: "scroll",
          "::-webkit-scrollbar ": {
            width: "0px",
          },
          maxHeight: "100vh",
          display: {
            xs: !selectedChat ? "flex" : "none",
            md: "none",
          },
        }}>
        {chats
          ? chats.map((chat) => (
              <Grid item xs={12}>
                <Card
                  elevation={0}
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  sx={{
                    height: 45,
                    maxHeight: 45,
                    gap: 3,
                    background: "transparent",
                    borderRadius: 3,
                    cursor: "pointer",
                    p: 2,
                    position: "relative",
                  }}>
                  <Stack spacing={2} direction='row' alignItems='center'>
                    <Box>
                      {!chat.isGroupChat ? (
                        <Avatar
                          className='sub-bg'
                          alt={getSender(loggedUser, chat.users)}
                          src={getSenderPic(loggedUser, chat.users)}
                          sx={{ textTransform: "capitalize" }}
                        />
                      ) : (
                        <Avatar
                          className='sub-bg'
                          alt={chat.chatName}
                          src={chat.groupAdmin && chat.groupAdmin.pic}
                          sx={{ textTransform: "capitalize" }}
                        />
                      )}
                    </Box>
                    <Stack>
                      <Typography
                        className='main-text-color'
                        variant='body1'
                        sx={{ fontWeight: 600 }}>
                        {!chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName}
                      </Typography>

                      {chat.latestMessage && (
                        <>
                          <Box
                            sx={{
                              display:
                                !chat.isGroupChat &&
                                chat.latestMessage.sender._id === user._id
                                  ? "flex"
                                  : "block",
                              gap: 1,
                            }}>
                            <Typography className='main-text-color'>
                              {!chat.isGroupChat &&
                              chat.latestMessage.sender._id === user._id ? (
                                <Typography
                                  variant='body2'
                                  sx={{
                                    fontWeight: 600,
                                  }}>
                                  You:
                                </Typography>
                              ) : (
                                <></>
                              )}
                            </Typography>
                            <Typography
                              variant='body2'
                              className='main-text-color'>
                              {chat.latestMessage.content.length > 15
                                ? chat.latestMessage.content.substring(0, 15) +
                                  "..."
                                : chat.latestMessage.content}
                            </Typography>
                            <Typography
                              className='sub-text-color'
                              sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                position: "absolute",
                                bottom: 2,
                                right: 10,
                              }}>
                              {String(chat.createdAt).substring(0, 10)}
                            </Typography>
                          </Box>
                        </>
                      )}
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))
          : "loading"}
      </Grid>
    </Fragment>
  );
};

export default Sidebar;
