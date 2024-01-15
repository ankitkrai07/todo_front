import React, { useEffect } from "react";
import { Box, Button, Image, HStack, Heading } from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authReducer/action";
import { LOGOUT } from "../Redux/actionTypes";
const Navbar = () => {
  const [cookie, setCookie] = useCookies("token");
  const navigate = useNavigate();
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const username = useSelector((store) => store.authReducer.username);

 

  const dispatch = useDispatch();

  const handleLogout = () => {
    let token = document.cookie?.split("=")[1];

    dispatch(logout(token))
    navigate("/login")

    // dispatch(logout(token))
    //   .then((res) => {
    //     console.log(res.data);
    //     dispatch({ type: LOGOUT });
    //     navigate("/login");
    //     setCookie("token", "", { path: "/" });
    //   })
    //   .catch((err) => console.log(err));

  };

  return (
    <Box
      display={"flex"}
      justifyContent="space-between"
      gap="60px"
      alignItems={"center"}
      bgColor="dodgerblue"
      color={"white"}
      fontSize="17px"
      w="100%"
      p="8px 30px 8px 30px "
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Box display={"flex"} alignItems="center" gap="40px">
        <Image
          borderRadius={"6px"}
          mixBlendMode={"hard-light"}
          w="40px"
          src="https://play-lh.googleusercontent.com/36szRvmqeewn6fxpx9V88zhpPU3c84Im9zjAFPZl-cReiztnAD6cn0jSnWBGsNNdPsU"
        />
        <Link to="/">
          <Button size={"sm"}>Home</Button>
        </Link>
      </Box>

      <HStack spacing={"60px"}>
        {!isAuth ? (
          <Link to="/register">
            <Button colorScheme={"whiteAlpha"} size={"sm"}>
              Register
            </Button>
          </Link>
        ) : (
          <Heading fontSize={"15px"}>{`Welcome ${username}`}</Heading>
        )}

        {isAuth ? (
          <Button onClick={handleLogout} size={"sm"}>
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button size={"sm"}>Login</Button>
          </Link>
        )}
      </HStack>
    </Box>
  );
};

export default Navbar;
