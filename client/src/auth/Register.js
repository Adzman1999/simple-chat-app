import React, { Fragment, useState } from "react";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { register } from "../actions/UserAction";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const registerSubmit = (e) => {
    e.preventDefault();
    register(userName, userEmail, userPassword, confirm, navigate);
  };
  return (
    <Fragment>
      <Card
        component='form'
        onSubmit={registerSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", md: 500 },
          boxShadow: 0,
          background: "transparent",
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
          <Typography
            className='sub-text-color'
            variant='h6'
            component='h2'
            color='primary'
            sx={{ mb: { xs: 5, md: 0 } }}>
            Sign Up
          </Typography>
          <Stack spacing={2} mt={3} mb={2}>
            <TextField
              name='name'
              type='text'
              id='name'
              placeholder='Name'
              variant='outlined'
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              name='email'
              type='email'
              id='email'
              placeholder='Email'
              variant='outlined'
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <TextField
              name='password'
              type='password'
              id='password'
              placeholder='Password'
              variant='outlined'
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <TextField
              name='confirm-password'
              type='password'
              id='confirm-password'
              placeholder='Confirm Password'
              variant='outlined'
              onChange={(e) => setConfirm(e.target.value)}
            />
          </Stack>
          <Stack spacing={2}>
            <Button
              className='btn-bg'
              fullWidth
              variant='contained'
              type='submit'
              sx={{ textTransform: "capitalize", boxShadow: 0 }}>
              submit
            </Button>
            <Button
              onClick={() => navigate("/")}
              className='btn-bg-outlined'
              fullWidth
              variant='outlined'
              sx={{ textTransform: "capitalize", boxShadow: 0 }}>
              Login
            </Button>
          </Stack>
        </Card>
      </Card>
    </Fragment>
  );
};

export default Register;
