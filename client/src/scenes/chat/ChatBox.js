import { Avatar, Card, Tooltip, Typography } from "@mui/material";
import React, { Fragment } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatConfig";
import { ChatState } from "../../context/ChatProvider";

const ChatBox = ({ messages }) => {
  const { user } = ChatState();
  return (
    <Fragment>
      <Card
        elevation={0}
        sx={{
          background: "transparent",
        }}>
        {messages &&
          messages.map((m, i) => (
            <Card
              elevation={0}
              key={m._id}
              sx={{
                display: "flex",
                background: "transparent",
                alignItems: "center",
                gap: 1,
              }}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  className='sub-bg'
                  title={m.sender.name}
                  placement='top'>
                  <Avatar
                    alt={m.sender.name}
                    src={m.sender.pic}
                    sx={{
                      textTransform: "capitalize",
                      cursor: "pointer",
                      mt: isSameSender(messages, m, i, user._id) ? 1 : 7,
                    }}
                  />
                </Tooltip>
              )}
              <Typography
                variant='body2'
                className={
                  m.sender._id === user._id ? "sub-part-1-bg" : "sub-part-2-bg"
                }
                sx={{
                  p: "10px 15px",
                  color:
                    m.sender._id === user._id
                      ? "rgb(255, 255, 255)"
                      : "rgb(0, 0, 0)",
                  ml: isSameSenderMargin(messages, m, i, user._id),
                  mt: isSameUser(messages, m, i, user._id) ? 1 : 7,
                  borderRadius: 5,
                }}>
                {m.content}
              </Typography>
            </Card>
          ))}
      </Card>
    </Fragment>
  );
};

export default ChatBox;
