import { Card } from "@mui/material";
import React, { Fragment } from "react";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "../chat/SingleChat";

const Content = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Fragment>
      <Card
        className='sub-bg'
        elevation={0}
        sx={{
          display: { xs: "none", md: "flex" },
          maxHeight: "80vh",
          height: "80vh",
          borderRadius: 3,
          width: "100%",
          pr: 2,
          pl: 2,
          pb: 2,
          pt: 0,
        }}>
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Card>
      <Card
        elevation={0}
        sx={{
          display: { xs: selectedChat ? "flex" : "none", md: "none" },
          maxHeight: "100vh",
          height: "100vh",
          width: "100%",
          background: "transparent",
        }}>
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Card>
    </Fragment>
  );
};

export default Content;
