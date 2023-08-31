import {
  CheckBoxRounded,
  DarkModeOutlined,
  FullscreenExitRounded,
  FullscreenRounded,
  LightModeOutlined,
  SettingsOutlined,
  SquareRounded,
} from "@mui/icons-material";
import {
  Button,
  Card,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { ChatState } from "../../context/ChatProvider";

const SettingMenu = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { setMode, theme, setColorPreset, colorPicker } = ChatState();

  const toggleLightMode = () => {
    if (theme === "dark") setMode("light");
  };

  const toggleDarkMode = () => {
    if (theme === "light") setMode("dark");
  };

  const handleScreenSize = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };
  return (
    <Fragment>
      <IconButton className='sub-text-color' onClick={handleOpen}>
        <SettingsOutlined />
      </IconButton>
      <Drawer
        anchor='right'
        open={open}
        onClose={handleClose}
        variant='temporary'
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            background: "transparent",
            boxShadow: 0,
          },
        }}>
        <Card
          className='sub-bg'
          sx={{
            height: "100vh",
            maxHeight: "100vh",
            width: 257,
            p: 3,
            overflowX: "hidden",
            overflowY: "scroll",
            "::-webkit-scrollbar ": {
              width: "0px",
            },
            m: 1,
          }}>
          <Grid spacing={4} container>
            {/* Fullscreen */}
            <Grid item xs={12} md={12}>
              <Typography mb={2} className='sub-text-color'>
                Set Screen Size
              </Typography>
              <Stack spacing={2}>
                <Button
                  className='btn-bg '
                  variant='contained'
                  onClick={handleScreenSize}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: 0,
                  }}>
                  {!fullscreen ? (
                    <>
                      <FullscreenRounded />
                      <Typography variant='body2'>Fullscreen</Typography>
                    </>
                  ) : (
                    <>
                      <FullscreenExitRounded />
                      <Typography variant='body2'>Fullscreen Exit</Typography>
                    </>
                  )}
                </Button>
              </Stack>
            </Grid>
            {/* Theme Mode */}
            <Grid item xs={12} md={12}>
              <Typography mb={2} className='sub-text-color'>
                Set Theme
              </Typography>
              <Stack spacing={2} direction='row'>
                <Button
                  className='btn-bg '
                  fullWidth
                  variant='contained'
                  onClick={toggleDarkMode}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    p: 2,
                    boxShadow: 0,
                  }}>
                  <DarkModeOutlined />
                  <Typography variant='body2'>Dark</Typography>
                </Button>
                <Button
                  className='btn-bg '
                  fullWidth
                  variant='contained'
                  onClick={toggleLightMode}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: 0,
                  }}>
                  <LightModeOutlined />
                  <Typography variant='body2'>Light</Typography>
                </Button>
              </Stack>
            </Grid>
            {/* Color Mode */}
            <Grid item xs={12} md={12}>
              <Typography mb={1} className='sub-text-color'>
                Set Color Preset
              </Typography>
              <Stack spacing={1}>
                <Stack
                  justifyContent='center'
                  spacing={7.5}
                  alignItems='center'
                  direction='row'>
                  <IconButton
                    onClick={() => setColorPreset("primary")}
                    variant='contained'
                    sx={{
                      width: "50px",
                      height: "50px",
                      color: "rgba(37, 102, 203, 1)",
                    }}>
                    {colorPicker === "primary" ? (
                      <CheckBoxRounded color='primary' fontSize='large' />
                    ) : (
                      <SquareRounded color='primary' fontSize='large' />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => setColorPreset("secondary")}
                    variant='contained'
                    sx={{
                      width: "50px",
                      height: "50px",
                      color: "rgba(117, 58, 213, 1)",
                    }}>
                    {colorPicker === "secondary" ? (
                      <CheckBoxRounded fontSize='large' />
                    ) : (
                      <SquareRounded fontSize='large' />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => setColorPreset("success")}
                    variant='contained'
                    sx={{
                      width: "50px",
                      height: "50px",
                      color: "rgba(11, 140, 80, 1)",
                    }}>
                    {colorPicker === "success" ? (
                      <CheckBoxRounded color='success' fontSize='large' />
                    ) : (
                      <SquareRounded color='success' fontSize='large' />
                    )}
                  </IconButton>
                </Stack>
                <Stack
                  justifyContent='center'
                  alignItems='center'
                  direction='row'
                  spacing={7.5}>
                  <IconButton
                    onClick={() => setColorPreset("warning")}
                    variant='contained'
                    sx={{
                      width: "50px",
                      height: "50px",
                      color: "rgba(200, 140, 50, 1)",
                    }}>
                    {colorPicker === "warning" ? (
                      <CheckBoxRounded color='warning' fontSize='large' />
                    ) : (
                      <SquareRounded color='warning' fontSize='large' />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => setColorPreset("error")}
                    variant='contained'
                    color='error'
                    sx={{
                      width: "50px",
                      height: "50px",
                      color: "rgba(200, 49, 52, 1)",
                    }}>
                    {colorPicker === "error" ? (
                      <CheckBoxRounded color='error' fontSize='large' />
                    ) : (
                      <SquareRounded color='error' fontSize='large' />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => setColorPreset("info")}
                    variant='contained'
                    color='info'
                    sx={{
                      width: "50px",
                      height: "50px",
                      color: "rgba(30, 164, 205, 1)",
                    }}>
                    {colorPicker === "info" ? (
                      <CheckBoxRounded color='info' fontSize='large' />
                    ) : (
                      <SquareRounded color='info' fontSize='large' />
                    )}
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Drawer>
    </Fragment>
  );
};

export default SettingMenu;
