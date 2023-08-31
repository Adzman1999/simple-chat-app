import { CloseRounded, SearchRounded } from "@mui/icons-material";
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
import { addUserToGroup, searchUser } from "../../actions/ChatAction";
import { ChatState } from "../../context/ChatProvider";
import SearchItemCard from "../header/SearchItemCard";
import AddUserCard from "./AddUserCard";

const AddMemberModal = ({ handleMenuClose, setFetchAgain, fetchAgain }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleAddMember = () => {
    handleOpen();
    handleMenuClose();
  };

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, selectedChat, setSelectedChat } = ChatState();

  const handleSearch = (e) => {
    e.preventDefault();
    searchUser(search, user, setSearchResult, setLoading);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <Fragment>
      <Typography
        onClick={handleAddMember}
        sx={{ textTransform: "capitalize" }}>
        Add Member
      </Typography>
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
            className='sub-bg'
            component='form'
            onSubmit={handleSubmit}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "100%", md: 300 },
              height: { xs: 720, md: 470 },
              maxHeight: {
                xs: 720,
                md: 470,
              },
              borderRadius: 1,
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
                  Add Member
                </Typography>
                <IconButton className='sub-text-color' onClick={handleClose}>
                  <CloseRounded />
                </IconButton>
              </Box>

              <Stack spacing={2} mt={1}>
                <TextField
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
                  sx={{ fontSize: "18px" }}
                  fullWidth
                  placeholder='Search User'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Stack>
              <Typography
                className='main-text-color'
                mt={2}
                id='transition-modal-title'
                variant='body2'
                component='h2'
                sx={{ fontWeight: 600 }}>
                Added:
              </Typography>
              <Card
                elevation={0}
                sx={{
                  mt: 1,
                  pt: 2,
                  pb: 1,
                  pl: 3,
                  maxHeight: { xs: 200, md: 100 },
                  overflowY: "scroll",
                  overflowX: "hidden",

                  background: "transparent",
                }}>
                <Grid container spacing={2.5}>
                  {selectedChat.users.map((u) => (
                    <Grid xs={6} sm={4} md={6} key={u._id} mt={1}>
                      <AddUserCard
                        groupAdmin={selectedChat.groupAdmin}
                        userData={u}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Card>

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
                        maxHeight: { xs: 270, md: 150 },
                        overflowX: "hidden",
                        overflowY: "scroll",
                        "::-webkit-scrollbar ": {
                          width: "4px",
                        },
                        "::-webkit-scrollbar-thumb": {
                          backgroundColor: "rgb(194, 213, 218)",
                          borderRadius: "10px",
                        },
                      }}>
                      {searchResult.map((item, id) => (
                        <Grid item xs={12} md={12}>
                          <Box
                            className='btn-bg'
                            p={1}
                            key={id}
                            sx={{
                              // width: 240,
                              // maxWidth: 240,
                              borderRadius: 10,
                            }}>
                            <SearchItemCard
                              item={item}
                              event={() =>
                                addUserToGroup(
                                  item,
                                  user,
                                  selectedChat,
                                  setSelectedChat,
                                  setFetchAgain,
                                  fetchAgain,
                                  setLoading
                                )
                              }
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

export default AddMemberModal;
