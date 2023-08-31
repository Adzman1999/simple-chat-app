import React, { Fragment, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import SearchDrawer from "./SearchDrawer";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../config/ChatConfig";
import CreateGroupChatModal from "../sidebar/CreateGroupChatModal";
import SettingMenu from "./SettingMenu";
import Primary from "../../assets/chatme-1.png";
import Secondary from "../../assets/chatme-2.png";
import Error from "../../assets/chatme-3.png";
import Success from "../../assets/chatme-4.png";
import Warning from "../../assets/chatme-5.png";
import Info from "../../assets/chatme-6.png";

const Header = () => {
  const menuId = "primary-search-account-menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationMenuOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMenuOpen2 = Boolean(anchorE2);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClose2 = () => {
    setAnchorE2(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    handleMenuClose();
  };

  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    colorPicker,
  } = ChatState();

  return (
    <Fragment>
      <Box
        className='sub-bg'
        sx={{
          borderRadius: { xs: 0, md: 3 },
          mb: 2,
          display: { xs: selectedChat ? "none" : "block", md: "block" },
        }}>
        <Toolbar>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {colorPicker === "primary" && (
              <img src={Primary} alt='primary' style={{ width: "80px" }} />
            )}
            {colorPicker === "secondary" && (
              <img src={Secondary} alt='secondary' style={{ width: "80px" }} />
            )}
            {colorPicker === "error" && (
              <img src={Error} alt='error' style={{ width: "80px" }} />
            )}
            {colorPicker === "success" && (
              <img src={Success} alt='success' style={{ width: "80px" }} />
            )}
            {colorPicker === "warning" && (
              <img src={Warning} alt='warning' style={{ width: "80px" }} />
            )}
            {colorPicker === "info" && (
              <img src={Info} alt='info' style={{ width: "80px" }} />
            )}
          </Box>
          <Box>
            <SearchDrawer />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <CreateGroupChatModal />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <SettingMenu />
            </Box>
            <IconButton
              onClick={handleNotificationMenuOpen}
              sx={{ cursor: "pointer" }}
              className='sub-text-color'>
              <Badge badgeContent={notification.length}>
                <NotificationsOutlined />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorE2}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              id={menuId}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={isMenuOpen2}
              onClose={handleMenuClose2}>
              {notification.length === 0 ? (
                <MenuItem onClick={handleMenuClose2}>
                  No New Messages Yet
                </MenuItem>
              ) : (
                notification.map((notif) => (
                  <>
                    <MenuItem
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(
                          notification.filter((n) => n !== notif)
                        );
                        handleMenuClose2();
                      }}>
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(
                            user,
                            notif.chat.users
                          )}`}
                    </MenuItem>
                  </>
                ))
              )}
            </Menu>
            <Avatar
              className='sub-part-bg'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              alt={user.name}
              src={user.pic}
              sx={{ textTransform: "capitalize", ml: 2, cursor: "pointer" }}
            />
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              id={menuId}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={isMenuOpen}
              onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <a
                href='/'
                onClick={handleLogout}
                style={{ textDecoration: "none" }}>
                <MenuItem>Logout</MenuItem>
              </a>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </Fragment>
  );
};

export default Header;
