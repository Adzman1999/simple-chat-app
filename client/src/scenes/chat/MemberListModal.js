import React, { Fragment, useState } from "react";
import { CloseRounded } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  Fade,
  IconButton,
  Modal,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { ChatState } from "../../context/ChatProvider";
import { removeUserFromGroup } from "../../actions/ChatAction";

const MemberListModal = ({
  setFetchAgain,
  fetchAgain,
  handleMenuClose,
  getMessages,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleMemberList = () => {
    handleOpen();
    handleMenuClose();
  };
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <Fragment>
      <Typography
        onClick={handleMemberList}
        sx={{ textTransform: "capitalize" }}>
        Member List
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
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "100%", md: 300 },
              height: { xs: 720, md: 550 },
              maxHeight: {
                xs: 720,
                md: 550,
              },
              borderRadius: 1,
              pl: 1,
              pr: 1,
              pt: 0,
              pb: 3,
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
                overflowX: "hidden",
                overflowY: "scroll",
                "::-webkit-scrollbar ": {
                  width: "0px",
                },
                position: "relative",
              }}>
              <Box
                className='sub-bg'
                sx={{
                  position: "sticky",
                  top: 0,
                  pb: 1,
                  width: { xs: "100%", md: 280 },
                  zIndex: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pt: 1,
                }}>
                <Typography
                  className='main-text-color'
                  id='transition-modal-title'
                  variant='h6'
                  component='h2'
                  color='primary'>
                  Member List
                </Typography>
                <IconButton className='sub-text-color' onClick={handleClose}>
                  <CloseRounded />
                </IconButton>
              </Box>
              <Stack mt={1} direction='row' alignItems='center'>
                <Typography
                  className='main-text-color'
                  variant='body2'
                  component='h2'
                  sx={{ fontWeight: 600 }}>
                  Admin:
                </Typography>
                {selectedChat.users.map((u1) => (
                  <Typography
                    className='sub-text-color'
                    variant='body2'
                    component='h2'
                    sx={{ ml: "1px" }}>
                    {selectedChat.groupAdmin.admin === u1._id ? u1.name : ""}
                  </Typography>
                ))}
              </Stack>

              <Grid spacing={2} mt={1} mb={2}>
                {selectedChat.users.map((u) => (
                  <>
                    {selectedChat.groupAdmin.admin === u._id ? (
                      <></>
                    ) : (
                      <Grid item xs={12} md={12} mt={2}>
                        <Stack
                          spacing={1}
                          className='sub-part-1-bg'
                          sx={{
                            p: 2,
                            pb: 6,
                            border: "1px",
                            borderStyle: "solid",
                            borderRadius: "15px",
                            maxHeight: 40,
                            height: 40,
                          }}>
                          <Stack
                            key={u._id}
                            spacing={2}
                            direction='row'
                            alignItems='center'>
                            <Avatar
                              className='sub-part-3-bg'
                              alt={u.name}
                              src={u.pic}
                              sx={{ textTransform: "capitalize" }}
                            />

                            <Stack className='main-text-color'>
                              <Typography
                                variant='body2'
                                sx={{ fontWeight: 500 }}>
                                {u.name}
                              </Typography>
                              <Typography
                                variant='body2'
                                sx={{ fontWeight: 500 }}>
                                {u.email}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row-reverse",
                            }}>
                            <Button
                              className='btn-bg-outlined'
                              disabled={u._id === user._id ? true : false}
                              onClick={() =>
                                removeUserFromGroup(
                                  u,
                                  user,
                                  selectedChat,
                                  setSelectedChat,
                                  setFetchAgain,
                                  fetchAgain,
                                  getMessages
                                )
                              }
                              size='small'
                              variant='outlined'
                              sx={{
                                textTransform: "capitalize",
                                fontSize: "10px",
                                borderRadius: "15px",
                              }}>
                              Remove
                            </Button>
                          </Box>
                        </Stack>
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
            </Card>
          </Card>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default MemberListModal;
