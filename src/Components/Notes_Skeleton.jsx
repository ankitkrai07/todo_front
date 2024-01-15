import React from "react";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
  Stack,
  Button,
  Center,
  GridItem,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";

function Notes_Skeleton() {
  const [isLoaded, setIsLoaded] = useState(false);

  // const notes = useSelector((store) => store.notesReducer.notes)
  return (
    <Center mt="30px">
      <Flex  gap={4} justifyContent="center" alignItems={"center"} flexWrap={"wrap"}>
        {Array.from({ length: 15}).map((_, index) => (
          <GridItem key={index}>
            <Skeleton height="150px" width="300px" borderRadius={"30px"} />
            {/* <Skeleton mt={2} height="20px" width="80%" />
        <Skeleton mt={2} height="20px" width="60%" />
        <Skeleton mt={2} height="20px" width="70%" /> */}
          </GridItem>
        ))}
      </Flex>
    </Center>
  );
}

export default Notes_Skeleton;
