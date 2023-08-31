import { Box, CircularProgress } from "@mui/material";
import React, { Fragment } from "react";

const LoadingChat = () => {
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}>
        <CircularProgress className='sub-text-color' />
      </Box>
    </Fragment>
  );
};

export default LoadingChat;
