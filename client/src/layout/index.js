import { Card } from "@mui/material";
import React, { Fragment, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import Content from "../scenes/content/Content";
import Header from "../scenes/header/Header";
import Sidebar from "../scenes/sidebar/Sidebar";

const Home = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <Fragment>
      <Card
        elevation={0}
        sx={{
          width: "100%",
          height: "100vh",
          background: "transparent",
        }}>
        <Card elevation={0} sx={{ m: 2, background: "transparent" }}>
          {user && <Header />}
          <Card
            elevation={0}
            sx={{
              display: "flex",
              gap: 2,
              background: "transparent",
            }}>
            {user && <Sidebar fetchAgain={fetchAgain} />}

            {user && (
              <Content fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </Card>
        </Card>
      </Card>
    </Fragment>
  );
};

export default Home;
