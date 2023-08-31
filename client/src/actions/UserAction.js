import axios from "axios";

export const register = async (
  userName,
  userEmail,
  userPassword,
  confirm,
  handleClose,
  setErr,
  setSuccess,
  handleOpen3,
  handleOpen4
) => {
  try {
    if (userPassword !== confirm) {
      handleOpen3();
      setErr("Password does not match, try again");
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/create",
        { name: userName, email: userEmail, password: userPassword },
        config
      );
      localStorage.setItem("userInfos", JSON.stringify(data));
      handleOpen4();
      setSuccess("Successfully Registered");
      handleClose();
    }
  } catch (error) {
    handleOpen3();
    setErr("Unsuccessfully Registered");
    handleClose();
  }
};

export const login = async (
  emailUser,
  passwordUser,
  navigate,
  setErr,
  handleOpen1
) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/login",
      { email: emailUser, password: passwordUser },
      config
    );
    localStorage.setItem("userInfos", JSON.stringify(data));
    navigate("/chat");
  } catch (error) {
    handleOpen1();
    setErr("Email and password are invalid");
    navigate("/");
  }
};
