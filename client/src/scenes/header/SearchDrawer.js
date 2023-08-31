import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  Card,
  Drawer,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChatState } from "../../context/ChatProvider";
import { SearchRounded } from "@mui/icons-material";
import { accessChat, searchUser } from "../../actions/ChatAction";
import SearchItemCard from "./SearchItemCard";
import SearchSkeleton from "./SearchSkeleton";

const SearchDrawer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setSelectedChat, user, chats, setChats } = ChatState();

  const handleSearch = (e) => {
    e.preventDefault();
    searchUser(search, user, setSearchResult, setLoading);
  };

  return (
    <Fragment>
      <Button
        className='btn-bg-outlined'
        startIcon={<SearchRounded />}
        variant='outlined'
        onClick={handleOpen}
        sx={{
          ml: 4,
          textTransform: "capitalize",
          display: { xs: "none", md: "flex" },
        }}>
        Find someone to chat
      </Button>
      <Button
        className='btn-bg-outlined'
        variant='outlined'
        onClick={handleOpen}
        sx={{
          minWidth: "35px",
          maxWidth: "35px",
          display: { xs: "flex", md: "none" },
        }}>
        <SearchRounded sx={{ fontSize: "18px" }} />
      </Button>
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
            pl: 1,
            pr: 1,
            p: 2,
            overflowX: "hidden",
            overflowY: "scroll",
            "::-webkit-scrollbar ": {
              width: "0px",
            },
            pt: 0,
            m: 1,
            background: "rgb(230, 238, 240)",
          }}>
          <Stack
            className='sub-bg'
            component='form'
            onSubmit={handleSearch}
            justifyContent='center'
            alignItems='center'
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 100,
              pt: 2,
            }}>
            <TextField
              className='MuiOutlinedInput-root '
              fullWidth
              placeholder='Search...'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              size='small'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Button
                      className='btn-bg-outlined'
                      variant='outlined'
                      sx={{ minWidth: "35px", maxWidth: "35px" }}
                      type='submit'>
                      <SearchRounded sx={{ fontSize: "18px" }} />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          {loading ? (
            <Stack
              mt={2}
              justifyContent='center'
              alignItems='center'
              spacing={2}>
              <Typography
                className='sub-text-color'
                variant='body2'
                color='primary'
                sx={{ alignSelf: "flex-start" }}>
                Result
              </Typography>
              <SearchSkeleton />
            </Stack>
          ) : (
            <Stack spacing={2} mt={2}>
              <Typography
                className='sub-text-color'
                variant='body2'
                color='primary'
                sx={{ alignSelf: "flex-start" }}>
                Result
              </Typography>
              {searchResult.map((item, id) => (
                <>
                  <Box
                    className='btn-bg'
                    key={id}
                    p={1}
                    sx={{
                      width: 235,
                      maxWidth: 235,
                      borderRadius: 10,
                    }}>
                    <SearchItemCard
                      item={item}
                      event={() =>
                        accessChat(
                          item._id,
                          user,
                          setSelectedChat,
                          setChats,
                          chats,
                          handleClose
                        )
                      }
                    />
                  </Box>
                </>
              ))}
            </Stack>
          )}
        </Card>
      </Drawer>
    </Fragment>
  );
};

export default SearchDrawer;
