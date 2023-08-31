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
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const ProfileModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Fragment>
      <Avatar
        onClick={handleOpen}
        alt={user.name}
        src={user.pic}
        sx={{ textTransform: "capitalize", cursor: "pointer" }}
      />
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Card
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
              p: { xs: 1, md: 2 },
              boxShadow: { xs: 0, md: "2px 2px 10px 2px rgba(0, 0, 0, 0.1)" },
              background: { xs: "transparent", md: "rgb(230, 238, 240)" },
            }}>
            <Card
              sx={{
                p: { xs: 2 },
                height: { xs: 700 },
                maxHeight: { xs: 700 },
                boxShadow: { xs: "2px 2px 10px 2px rgba(0, 0, 0, 0.1)", md: 0 },
                background: "transparent",
              }}>
              <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                <IconButton onClick={handleClose}>
                  <CloseRounded />
                </IconButton>
              </Box>

              <Typography>{user.name}</Typography>
            </Card>
          </Card>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default ProfileModal;
