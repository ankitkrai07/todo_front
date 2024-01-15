import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Box,
  Button,
  FormControl,
  Input,
  Heading,
  Image,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../Redux/store";
import { login } from "../Redux/authReducer/action";
import { AUTH_ERROR, AUTH_SUCCESS } from "../Redux/actionTypes";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cookies, setCookie] = useCookies("token");
  const toast = useToast();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const token = useSelector((store) => store.authReducer.token);
  // const isAuth = useSelector((store) => store.authReducer.isAuth);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      pass,
    };
    dispatch(login(user))
      .then((res) => {
        dispatch({
          type: AUTH_SUCCESS,
          payload: [res.data.token, res.data.username],
        });
        setCookie("token", res.data.token, { path: "/" });
        // console.log(res.data);

        res.data.msg == "Login Successfull"
          ? (toast({
              title: "Login Successfull.",
              status: "success",
              duration: 5000,
              isClosable: true,
            }),
            navigate("/notes"))
          : toast({
              title: "Wrong Credentials.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
      })
      .catch((err) => {
        dispatch({ type: AUTH_ERROR });
        toast({
          title: "Wrong Credentials.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      height={"700px"}
      bgColor={"#B9E9FC"}
      position="fixed"
      display={"flex"}
      w="100%"
      alignItems="center"
      justifyContent={{
        base: "space-evenly",
        sm: "space-evenly",
        md: "space-evenly",
        lg: "space-evenly",
        xl: "space-evenly",
      }}
    >
      <Image
        mixBlendMode={"multiply"}
        display={{
          base: "none",
          sm: "none",
          md: "block",
          lg: "block",
          xl: "block",
        }}
        src="https://i.pinimg.com/564x/40/36/89/403689fe701fedda5ceb6f82c7a88992.jpg"
        width={{base:"400px", sm:"400px", md:"300px", lg:"600px", xl:"600px"}}
      />

      <form onSubmit={handleLogin}>
        <FormControl
          w="350px"
          boxShadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
          bgColor="white"
          p="20px"
          borderRadius={"10px"}
        >
          <Heading textAlign={"center"} fontSize={"30px"} mb="20px">
            Login 📘
          </Heading>
          <FormLabel mt="20px" fontSize={"15px"}>
            Enter Registered Email
          </FormLabel>
          <Input
            type="email"
            value={email}
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            id="email"
            size={"sm"}
            w="300px"
          />

          <FormLabel mt={"20px"} fontSize={"15px"}>
            Enter Your Password
          </FormLabel>
          <Input
            type="password"
            value={pass}
            variant="filled"
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter Your Password"
            id="password"
            size={"sm"}
            w="300px"
          />
          <Button
            m="auto"
            display={"block"}
            mt={"20px"}
            type="submit"
            colorScheme={"messenger"}
          >
            Login
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default Login;
