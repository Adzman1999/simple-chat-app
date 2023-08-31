import { HighlightOffRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { Fragment } from "react";

const UserChipItem = ({ user, groupAdmin, event }) => {
  return (
    <Fragment>
      <Box
        className='border-style'
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // gap: String(user.name).length > 5 ? 1 : 0.5,
          pl: "10px",
          borderRadius: "15px",
          border: "solid 1px",
        }}>
        <Typography className='main-text-color'>
          {String(user.name).length > 5
            ? String(user.name).substring(0, 5) + ".."
            : user.name || (groupAdmin.admin._id === user._id ? "(admin)" : "")}
        </Typography>
        <IconButton onClick={event} className='main-text-color'>
          <HighlightOffRounded fontSize='small' />
        </IconButton>
      </Box>
    </Fragment>
  );
};

export default UserChipItem;
