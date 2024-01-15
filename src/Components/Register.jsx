import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Input,
  FormControl,
  Button,
  Heading,
  Image,
  FormHelperText,
  Text,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [isError, setIserror] = useState(true);

  const navigate = useNavigate();
  const toast = useToast();
  const handleSignUp = (e) => {
    e.preventDefault();
    const newuser = {
      email,
      pass,
      username,
    };
    axios
      .post("https://notes-api-hzrj.onrender.com/users/register", newuser)
      .then((res) => {
        if (res.data == "Set Strong Password") {
          setIserror(true);
        } else if (res.data == "Already have Account") {
          toast({
            title: "Already have hccount",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setIserror(false);
          navigate("/login");
        }
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box
      height={"700px"}
      position="fixed"
      width={"100%"}
      bgColor={"#B9E9FC"}
      display={"flex"}
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
        width={{base:"400px", sm:"400px", md:"300px", lg:"500px", xl:"600px"}}
      />

      <form onSubmit={handleSignUp}>
        <FormControl
          w="350px"
          boxShadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
          bgColor="white"
          p="20px"
          borderRadius={"10px"}
        >
          <Heading textAlign={"center"} fontSize={"30px"} mb="20px">
            Register 📘
          </Heading>

          <FormLabel mt={"20px"} fontSize={"15px"}>
            Create Username
          </FormLabel>
          <Input
            type="text"
            value={username}
            variant="filled"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Create Username"
            size={"sm"}
            w="300px"
          />

          <FormLabel mt={"20px"} fontSize={"15px"}>
            Enter Email
          </FormLabel>
          <Input
            type="email"
            value={email}
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            size={"sm"}
            w="300px"
          />
          <FormLabel mt={"20px"} fontSize={"15px"}>
            Create Password
          </FormLabel>
          <Input
            type="password"
            value={pass}
            variant="filled"
            onChange={(e) => setPass(e.target.value)}
            placeholder="Create Password"
            size={"sm"}
            w="300px"
          />
          {
            <FormHelperText color="grey">
              8-character password: 1 letter, 1 digit, 1 uppercase.
            </FormHelperText>
          }
          <Button
            m="auto"
            display={"block"}
            mt={"20px"}
            type="submit"
            colorScheme={"messenger"}
          >
            Register
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default Register;
