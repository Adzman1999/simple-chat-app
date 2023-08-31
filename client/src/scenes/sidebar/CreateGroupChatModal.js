import {
  CloseRounded,
  GroupAddOutlined,
  SearchRounded,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Card,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { createAGroupChat, searchUser } from "../../actions/ChatAction";
import { ChatState } from "../../context/ChatProvider";
import SearchItemCard from "../header/SearchItemCard";
import UserChipItem from "./UserChipItem";

const CreateGroupChatModal = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      alert("User Already Added");
    } else {
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchUser(search, user, setSearchResult, setLoading);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAGroupChat(
      user,
      setChats,
      chats,
      groupChatName,
      selectedUsers,
      handleClose,
      setSelectedUsers,
      setSearch
    );
  };

  return (
    <Fragment>
      <Button
        className='btn-bg-outlined'
        onClick={handleOpen}
        variant='outlined'
        size='small'
        sx={{
          textTransform: "capitalize",
          display: {
            xs: "none",
            md: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            border: "1px solid #fff",
          },
        }}>
        <GroupAddOutlined sx={{ fontSize: "18px" }} />
        Create A Group
      </Button>
      <Button
        className='btn-bg-outlined'
        onClick={handleOpen}
        variant='outlined'
        sx={{
          ml: 2,
          minWidth: "35px",
          maxWidth: "35px",
          display: { xs: "flex", md: "none" },
        }}>
        <GroupAddOutlined sx={{ fontSize: "18px" }} />
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{ backdropFilter: "blur(13px)" }}>
        <Fade in={open}>
          <Card
            component='form'
            onSubmit={handleSubmit}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "100%", md: 300 },
              height: { xs: 720, md: selectedUsers.length === 0 ? 490 : 560 },
              maxHeight: {
                xs: 720,
                md: selectedUsers.length === 0 ? 600 : 700,
              },
              pl: 1,
              pr: 1,
              pt: 0,
              boxShadow: 0,
              background: "transparent",
            }}>
            <Card
              className='sub-bg'
              sx={{
                pl: 2,
                pr: 2,
                pt: 0,
                height: 700,
                maxHeight: 700,
                boxShadow: 0,
                m: { xs: 2, md: 0 },
              }}>
              <Box
                className='sub-bg'
                sx={{
                  width: { xs: "100%", md: 280 },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pb: 1,
                  pt: 1,
                }}>
                <Typography
                  className='main-text-color'
                  id='transition-modal-title'
                  variant='h6'
                  component='h2'
                  color='primary'>
                  Create A New Group
                </Typography>
                <IconButton className='sub-text-color' onClick={handleClose}>
                  <CloseRounded />
                </IconButton>
              </Box>
              <Stack
                direction='row'
                spacing={2}
                sx={{
                  display: selectedUsers.length === 0 ? "none" : "flex",
                  mt: 2,
                  pb: 1,
                  maxWidth: 270,
                  overflowY: "hidden",
                  overflowX: "scroll",
                  "::-webkit-scrollbar ": {
                    height: "10px",
                    cursor: "pointer",
                  },
                  // "::-webkit-scrollbar-thumb": {
                  //   backgroundColor: "rgb(194, 213, 218)",
                  //   borderRadius: "10px",
                  // },
                }}>
                {selectedUsers.map((u) => (
                  <Box key={u._id}>
                    <UserChipItem user={u} event={() => handleDelete(u)} />
                  </Box>
                ))}
              </Stack>
              <Stack spacing={2} mt={1}>
                <TextField
                  sx={{ fontSize: "18px" }}
                  required
                  type='text'
                  fullWidth
                  placeholder='Set Group Name'
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <TextField
                  sx={{ fontSize: "18px" }}
                  // required
                  fullWidth
                  type='file'
                  // placeholder='Set Group Name'
                  // onChange={(e) => setGroupChatName(e.target.value)}
                />
                <TextField
                  sx={{ fontSize: "18px" }}
                  fullWidth
                  placeholder='Search User'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Button
                          className='btn-bg-outlined'
                          variant='outlined'
                          onClick={handleSearch}
                          sx={{ minWidth: "35px", maxWidth: "35px" }}>
                          <SearchRounded />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  className='btn-bg'
                  variant='contained'
                  type='submit'
                  sx={{ boxShadow: 0, textTransform: "capitalize" }}>
                  {" "}
                  Submit
                </Button>
              </Stack>
              {searchResult.length === 0 ? (
                <Typography
                  className='sub-text-color'
                  sx={{ textAlign: "center", mt: 9 }}>
                  No User Selected Yet
                </Typography>
              ) : (
                <>
                  {loading ? (
                    "loading"
                  ) : (
                    <Grid
                      spacing={2}
                      container
                      mt={2}
                      sx={{
                        maxHeight: { xs: 350, md: 150 },
                        overflowX: "hidden",
                        overflowY: "scroll",
                        "::-webkit-scrollbar ": {
                          width: "0px",
                        },
                      }}>
                      {searchResult.map((item, id) => (
                        <Grid item xs={12} md={12}>
                          <Box
                            className='btn-bg'
                            p={1}
                            key={id}
                            sx={{
                              borderRadius: 10,
                            }}>
                            <SearchItemCard
                              item={item}
                              event={() => handleGroup(item)}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </>
              )}
            </Card>
          </Card>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default CreateGroupChatModal;
