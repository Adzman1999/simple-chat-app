import { Avatar, Card, Typography, Box } from "@mui/material";
import React, { Fragment } from "react";

const SearchItemCard = ({ item, event }) => {
  return (
    <Fragment>
      <Card
        onClick={event}
        elevation={0}
        sx={{
          // width: 167,
          // maxWidth: 167,
          // height: 25,
          // maxHeight: 25,
          // display: "flex",
          // alignItems: "center",
          // gap: 2,
          // background: "rgb(194, 213, 218)",
          // borderRadius: 2,
          // p: 2,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 2,
          background: "transparent",
        }}>
        <Box>
          <Avatar
            className='sub-part-bg'
            alt={item.name}
            src={item.pic}
            sx={{ textTransform: "capitalize" }}
          />
        </Box>
        <Typography variant='body2' className='main-text-color'>
          {item.name}
        </Typography>
      </Card>
    </Fragment>
  );
};

export default SearchItemCard;
