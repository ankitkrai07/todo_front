import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { easeOut } from "framer-motion";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import add from "../assets/add.png";
import { NOTES_POST_ERROR, NOTES_POST_SUCCESS } from "../Redux/actionTypes";
import { createNotes, EditNotes } from "../Redux/notesReducer/action";

const Add_Notes = ({ getNotes }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const toast = useToast();
  const token = document.cookie?.split("=")[1];

  const addNotes = () => {
    const newNote = {
      title,
      body,
    };
    if (title) {
      dispatch(createNotes(newNote))
        .then((res) => {
          // console.log(res.data);
          dispatch({ type: NOTES_POST_SUCCESS });
          toast({
            title: "Note Created.",
            description: "We've created Note for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          dispatch(getNotes(token));
        })
        .catch((err) => {
          dispatch({ type: NOTES_POST_ERROR });
        });
    } else {
      toast({
        title: "Title can't be Empty",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box onClick={onOpen} position="relative">
        {" "}
        <Image
          position={"fixed"}
          top="80%"
          left={{ base: "85%", sm: "85%", md: "90%", lg: "90%", xl: "90%" }}
          src={add}
          width="60px"
          cursor={"pointer"}
          title="Add Notes"
        />
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <Textarea
                placeholder="Note"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (title.trim() !== "") {
                  addNotes();
                  onClose();
                }
              }}
              isDisabled={title.trim() === ""}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Add_Notes;
