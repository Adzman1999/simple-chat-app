import {
  Backdrop,
  Button,
  Card,
  Fade,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import {
  CloseRounded,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { register } from "../actions/UserAction";

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  const [open4, setOpen4] = useState(false);
  const handleOpen4 = () => {
    setOpen4(true);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };

  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // const [pic, setPic] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();
    register(
      userName,
      userEmail,
      userPassword,
      confirm,
      handleClose,
      setErr,
      setSuccess,
      handleOpen3,
      handleOpen4
    );
  };

  return (
    <Fragment>
      <Button
        fullWidth
        variant='outlined'
        onClick={handleOpen}
        sx={{ textTransform: "capitalize" }}
        className='btn-bg-outlined'>
        Sign Up
      </Button>
      <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
        <Alert onClose={handleClose3} severity='error' sx={{ width: "100%" }}>
          {err}
        </Alert>
      </Snackbar>
      <Snackbar open={open4} autoHideDuration={6000} onClose={handleClose4}>
        <Alert onClose={handleClose4} severity='success' sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
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
            elevation={3}
            // component='form'
            // onSubmit={registerSubmit}
            sx={{
              width: { xs: "100%", md: 500 },
              boxShadow: 0,
              background: "transparent",
              zIndex: 2000,
            }}>
            <Card
              className='sub-bg'
              sx={{
                boxShadow: 0,
                pr: 4,
                pl: 4,
                pt: 0,
                pb: 4,
                m: 2,
              }}>
              <Box
                className='sub-bg'
                sx={{
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
                  Sign Up
                </Typography>
                <IconButton className='sub-text-color' onClick={handleClose}>
                  <CloseRounded />
                </IconButton>
              </Box>
              <Stack spacing={2} mt={3} mb={2}>
                <TextField
                  required
                  name='name'
                  type='text'
                  id='name'
                  placeholder='Name'
                  variant='outlined'
                  onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                  required
                  name='email'
                  type='email'
                  id='email'
                  placeholder='Email'
                  variant='outlined'
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <TextField
                  required
                  name='password'
                  type={open1 === false ? "password" : "text"}
                  id='password'
                  placeholder='Password'
                  variant='outlined'
                  onChange={(e) => setUserPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {open1 === false ? (
                          <IconButton
                            className='sub-text-color'
                            onClick={handleOpen1}>
                            <VisibilityOffOutlined />
                          </IconButton>
                        ) : (
                          <IconButton
                            className='sub-text-color'
                            onClick={handleClose1}>
                            <VisibilityOutlined />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  name='confirm-password'
                  type={open2 === false ? "password" : "text"}
                  id='confirm-password'
                  placeholder='Confirm Password'
                  variant='outlined'
                  onChange={(e) => setConfirm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {open2 === false ? (
                          <IconButton
                            className='sub-text-color'
                            onClick={handleOpen2}>
                            <VisibilityOffOutlined />
                          </IconButton>
                        ) : (
                          <IconButton
                            className='sub-text-color'
                            onClick={handleClose2}>
                            <VisibilityOutlined />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Button
                id='sign-up'
                className='btn-bg'
                variant='contained'
                fullWidth
                onClick={registerSubmit}
                sx={{ textTransform: "capitalize", boxShadow: 0 }}>
                Submit
              </Button>
            </Card>
          </Card>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default SignUp;
