import React, { Fragment, useState } from "react";
import { CloseRounded } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Card,
  Fade,
  IconButton,
  Modal,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { ChatState } from "../../context/ChatProvider";
import { updateGroupChat } from "../../actions/ChatAction";

const EditGroupModal = ({ handleMenuClose, setFetchAgain, fetchAgain }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleEditGroup = () => {
    handleOpen();
    handleMenuClose();
  };

  const { user, selectedChat, setSelectedChat } = ChatState();

  const [groupChatName, setGroupChatName] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGroupChat(
      user,
      groupChatName,
      selectedChat,
      setSelectedChat,
      setFetchAgain,
      fetchAgain,
      handleClose,
      setGroupChatName
    );
  };
  return (
    <Fragment>
      <Typography
        onClick={handleEditGroup}
        sx={{ textTransform: "capitalize" }}>
        Edit Group
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
              height: { xs: 720, md: 400 },
              maxHeight: {
                xs: 720,
                md: 400,
              },
              borderRadius: 1,
              pl: 1,
              pr: 1,
              pb: 3,
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
                  Edit Group
                </Typography>
                <IconButton className='sub-text-color' onClick={handleClose}>
                  <CloseRounded />
                </IconButton>
              </Box>
              <Stack spacing={2} mt={1}>
                <Stack justifyContent='center' alignItems='center' spacing={1}>
                  <Box
                    className='sub-part-1-bg'
                    sx={{
                      border: "2px",
                      borderStyle: "solid",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}>
                    <img
                      alt={selectedChat.chatName}
                      src={selectedChat.groupAdmin.pic}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  </Box>
                  <Typography className='sub-text-color'>
                    {selectedChat.chatName}
                  </Typography>
                </Stack>
                <TextField
                  className='MuiOutlinedInput-root '
                  sx={{ fontSize: "18px" }}
                  required
                  type='text'
                  fullWidth
                  placeholder='Set New Group Name'
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <TextField
                  className='MuiOutlinedInput-root '
                  sx={{ fontSize: "18px" }}
                  // required
                  fullWidth
                  type='file'
                  // onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Button
                  className='btn-bg'
                  variant='contained'
                  type='submit'
                  sx={{ boxShadow: 0, textTransform: "capitalize" }}>
                  Submit
                </Button>
              </Stack>
            </Card>
          </Card>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default EditGroupModal;
