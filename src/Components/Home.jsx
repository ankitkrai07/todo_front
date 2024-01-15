import React from "react";
import { Box, Button, Image } from "@chakra-ui/react";
import wallpaper from "../assets/wallpaper.jpg";
import Typewriter from "typewriter-effect";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {

  const isAuth = useSelector((store) => store.authReducer.isAuth)
  const navigate = useNavigate()

  const handleClick=()=>{
      if(isAuth){
        navigate("/notes")
      }
      else{
        navigate("/notes")
      }
  }
  return (
    <Box
      position={"fixed"}
      h="700px"
      bgSize={"cover"}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgImage={wallpaper}
      width="100%"
   
    >
      <Box
        w={{base:"300px", sm:"300px", md:"700px", lg:"900px", xl:"1000px"}}
        borderRadius={"15px"}
        m="auto"
        position={"relative"}
        top="40px"
        // left={"18%"}
        bgColor={"white"}
        h="150px"
        display={"flex"}
        alignItems="center"
        gap="30px"
      >
        <Box>
          <Image
            borderRadius={"6px"}
            w="150px"
            src="https://play-lh.googleusercontent.com/36szRvmqeewn6fxpx9V88zhpPU3c84Im9zjAFPZl-cReiztnAD6cn0jSnWBGsNNdPsU"
          />
        </Box>
        <Box width={"auto"} fontSize={{base:"20px", sm:"20px", md:"30px", lg:"30px", xl:"30px"}} fontFamily={"cursive"}>
          <Typewriter
            options={{
              loop: true, // Add the loop option to make it run again and again
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Transforming Ideas into Digital Notes.")
                .pauseFor(1000)
                .deleteAll()
                .start();
            }}
          />
        </Box>
        <Button
          top="300px"
          left={{base:"150px", sm:"300px", md:"350px", lg:"500px", xl:"750px"}}
          size="sm"
          colorScheme={"blue"}
          onClick={handleClick}
          position="fixed"
        >
          Create Notes
        </Button>
        
      </Box>
   
        {/* <Button
          top="150px"
          left={"600px"}
          size="sm"
          colorScheme={"blue"}
          onClick={handleClick}
          position="absolute"
        >
          Create Notes
        </Button> */}
    
    </Box>
  );
};

export default Home;
