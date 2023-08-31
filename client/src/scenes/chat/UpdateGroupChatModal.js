// import {
//   CloseRounded,
//   SearchRounded,
//   UpdateOutlined,
// } from "@mui/icons-material";
// import {
//   Backdrop,
//   Box,
//   Button,
//   Card,
//   Fade,
//   IconButton,
//   InputAdornment,
//   Modal,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { Fragment, useState } from "react";
// import {
//   addUserToGroup,
//   removeUserFromGroup,
//   searchUser,
//   updateGroupChat,
// } from "../../actions/ChatAction";
// import { ChatState } from "../../context/ChatProvider";
// import SearchItemCard from "../header/SearchItemCard";
// import UserChipItem from "../sidebar/UserChipItem";

// const UpdateGroupChatModal = ({
//   fetchAgain,
//   setFetchAgain,
//   handleFetchMessages,
// }) => {
//   const [open, setOpen] = useState(false);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const [groupChatName, setGroupChatName] = useState();
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [renameLoading, setRenameLoading] = useState(false);

//   const { selectedChat, setSelectedChat, user } = ChatState();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     searchUser(search, user, setSearchResult, setLoading);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateGroupChat(
//       user,
//       groupChatName,
//       selectedChat,
//       setSelectedChat,
//       setRenameLoading,
//       setFetchAgain,
//       fetchAgain,
//       handleClose
//     );
//   };
//   return (
//     <Fragment>
//       <Button
//         onClick={handleOpen}
//         startIcon={<UpdateOutlined />}
//         variant='outlined'
//         size='small'
//         sx={{ textTransform: "capitalize" }}>
//         Update Group Chat
//       </Button>
//       <Modal
//         aria-labelledby='transition-modal-title'
//         aria-describedby='transition-modal-description'
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}>
//         <Fade in={open}>
//           <Card
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: { xs: "100%", md: 300 },
//               height: { xs: 720, md: 300 },
//               maxHeight: { xs: 720, md: 560 },
//               borderRadius: 1,
//               p: { xs: 1, md: 4 },
//               boxShadow: { xs: 0, md: "2px 2px 10px 2px rgba(0, 0, 0, 0.1)" },
//               background: { xs: "transparent", md: "#fff" },
//             }}>
//             <Card
//               component='form'
//               onSubmit={handleSubmit}
//               sx={{
//                 p: { xs: 2 },
//                 height: { xs: 700 },
//                 maxHeight: { xs: 700 },
//                 boxShadow: { xs: "2px 2px 10px 2px rgba(0, 0, 0, 0.1)", md: 0 },
//               }}>
//               <Box sx={{ position: "absolute", top: 10, right: 10 }}>
//                 <IconButton onClick={handleClose}>
//                   <CloseRounded />
//                 </IconButton>
//               </Box>
//               <Typography
//                 id='transition-modal-title'
//                 variant='h6'
//                 component='h2'
//                 color='primary'>
//                 Create A Group Chat
//               </Typography>
//               <Stack spacing={2} mt={3} mb={2}>
//                 <Stack direction='row' spacing={2}>
//                   <Button
//                     fullWidth
//                     variant='contained'
//                     type='submit'
//                     size='small'>
//                     update
//                   </Button>
//                   <Button
//                     onClick={() =>
//                       removeUserFromGroup(
//                         user,
//                         selectedChat,
//                         setSelectedChat,
//                         setFetchAgain,
//                         fetchAgain
//                       )
//                     }
//                     fullWidth
//                     variant='contained'
//                     size='small'>
//                     Leave
//                   </Button>
//                 </Stack>

//                 <TextField
//                   sx={{ fontSize: "18px" }}
//                   required
//                   fullWidth
//                   placeholder='Set Group Name'
//                   size='small'
//                   onChange={(e) => setGroupChatName(e.target.value)}
//                 />
//                 <Stack spacing={2} direction='row'>
//                   <TextField
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position='end'>
//                           <SearchRounded sx={{ fontSize: "18px" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{ fontSize: "18px" }}
//                     required
//                     fullWidth
//                     placeholder='Search User'
//                     size='small'
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                   />
//                   <Button variant='outlined' onClick={handleSearch}>
//                     Go
//                   </Button>
//                 </Stack>

//                 <Stack direction='row' spacing={2}>
//                   {selectedChat.users.map((u) => (
//                     <Box key={u._id}>
//                       <UserChipItem
//                         user={u}
//                         groupAdmin={selectedChat.groupAdmin}
//                         event={() =>
//                           removeUserFromGroup(
//                             u,
//                             user,
//                             selectedChat,
//                             setSelectedChat,
//                             setFetchAgain,
//                             fetchAgain,
//                             handleFetchMessages
//                           )
//                         }
//                       />
//                     </Box>
//                   ))}
//                 </Stack>
//                 {loading ? (
//                   "loading"
//                 ) : (
//                   <Stack
//                     spacing={2}
//                     sx={{
//                       height: 150,
//                       maxHeight: 150,
//                       overflowX: "hidden",
//                       overflowY: "scroll",
//                       "::-webkit-scrollbar ": {
//                         width: "2px",
//                       },
//                       "::-webkit-scrollbar-thumb": {
//                         backgroundColor: "rgba(86, 41, 107, 0.199)",
//                         borderRadius: "10px",
//                       },
//                     }}>
//                     {searchResult.map((item, id) => (
//                       <Box key={id}>
//                         <SearchItemCard
//                           item={item}
//                           event={() =>
//                             addUserToGroup(
//                               item,
//                               user,
//                               selectedChat,
//                               setSelectedChat,
//                               setFetchAgain,
//                               fetchAgain,
//                               setLoading
//                             )
//                           }
//                         />
//                       </Box>
//                     ))}
//                   </Stack>
//                 )}
//               </Stack>
//             </Card>
//           </Card>
//         </Fade>
//       </Modal>
//     </Fragment>
//   );
// };

// export default UpdateGroupChatModal;
