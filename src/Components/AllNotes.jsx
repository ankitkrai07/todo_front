import {
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  Image,
  useToast,
  Text,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_Notes from "./Add_Notes";
import add from "../assets/add.png";
import Single_Note from "./Single_Note";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../Redux/store";
import { getNotes } from "../Redux/notesReducer/action";
import { NOTES_ERROR, NOTES_FETCHING } from "../Redux/actionTypes";
import { useNavigate } from "react-router-dom";
import Notes_Skeleton from "./Notes_Skeleton";
import NoNotes from "./NoNotes";

const AllNotes = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const notes = useSelector((store) => store.notesReducer.notes);
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const loading = useSelector((store) => store.notesReducer.loading);

  const token = document.cookie?.split("=")[1];
  useEffect(() => {
    dispatch(getNotes(token));
  }, []);

  if (!isAuth) {
    return navigate("/login");
  }

  if (loading) {
    return <Notes_Skeleton/>
  } else if (!notes || notes.length===0) {
    return <NoNotes/>
  }

  return (
    <Box w="100%">
      <Add_Notes getNotes={getNotes} />

      <Flex
        // templateColumns={"repeat(5, 1fr)"}
        flexWrap={"wrap"}
        justifyContent="center"
        p="20px"
        boxSizing="border-box"
        alignItems={"flex-start"}
        gap="20px"
      >
        {notes.map((el) => (
          <Single_Note key={el._id} {...el} />
        ))}
      </Flex>
    </Box>
  );
};

export default AllNotes;
