import React, { Fragment, useState } from "react";
import {
  Alert,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { login } from "../actions/UserAction";
import { useNavigate } from "react-router-dom";
import Primary from "../assets/chatme-1.png";
import Secondary from "../assets/chatme-2.png";
import Error from "../assets/chatme-3.png";
import Success from "../assets/chatme-4.png";
import Warning from "../assets/chatme-5.png";
import Info from "../assets/chatme-6.png";
import { ChatState } from "../context/ChatProvider";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import SignUp from "./SignUp";

const Login = () => {
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
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
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const loginSubmit = (e) => {
    e.preventDefault();
    login(emailUser, passwordUser, navigate, setErr, handleOpen1);
  };

  const { colorPicker } = ChatState();

  return (
    <Fragment>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 0,
          background: "transparent",
          height: "100vh",
        }}>
        <Card
          component='form'
          onSubmit={loginSubmit}
          sx={{
            width: { xs: "100%", md: 500 },
            boxShadow: 0,
            background: "transparent",
          }}>
          <Card
            className='sub-bg'
            sx={{
              boxShadow: 0,
              p: 5,
              m: 2,
            }}>
            <Stack justifyContent='center' alignItems='center'>
              {colorPicker === "primary" && (
                <img src={Primary} alt='primary' style={{ width: "150px" }} />
              )}
              {colorPicker === "secondary" && (
                <img
                  src={Secondary}
                  alt='secondary'
                  style={{ width: "150px" }}
                />
              )}
              {colorPicker === "error" && (
                <img src={Error} alt='error' style={{ width: "150px" }} />
              )}
              {colorPicker === "success" && (
                <img src={Success} alt='success' style={{ width: "150px" }} />
              )}
              {colorPicker === "warning" && (
                <img src={Warning} alt='warning' style={{ width: "150px" }} />
              )}
              {colorPicker === "info" && (
                <img src={Info} alt='info' style={{ width: "150px" }} />
              )}
            </Stack>
            <Stack spacing={2} mt={3} mb={2}>
              <TextField
                required
                placeholder='Your Email'
                type='email'
                name='email'
                id='email'
                autoComplete='email'
                onChange={(e) => setEmailUser(e.target.value)}
              />
              <TextField
                required
                placeholder='Your Password'
                type={open === false ? "password" : "text"}
                name='password'
                id='password'
                autoComplete='password'
                onChange={(e) => setPasswordUser(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {open === false ? (
                        <IconButton
                          className='sub-text-color'
                          onClick={handleOpen}>
                          <VisibilityOffOutlined />
                        </IconButton>
                      ) : (
                        <IconButton
                          className='sub-text-color'
                          onClick={handleClose}>
                          <VisibilityOutlined />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={2}>
              <Button
                id='login'
                sx={{ textTransform: "capitalize", boxShadow: 0 }}
                className='btn-bg'
                fullWidth
                variant='contained'
                type='submit'>
                Login
              </Button>
              <SignUp />
            </Stack>
          </Card>
        </Card>
      </Card>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity='error' sx={{ width: "100%" }}>
          {err}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Login;
