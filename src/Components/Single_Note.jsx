import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Image,
  useToast 
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { DeleteNotes, EditNotes, getNotes } from "../Redux/notesReducer/action";
import { useDispatch, useSelector } from "react-redux";
import {
  NOTES_DELETE_ERROR,
  NOTES_DELETE_SUCCESS,
  NOTES_PATCH_ERROR,
  NOTES_PATCH_SUCCESS,
  NOTES_POST_ERROR,
  NOTES_POST_SUCCESS,
} from "../Redux/actionTypes";
import Edit_Notes from "./Edit_Notes";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { store } from "../Redux/store";
const initState = {
  title: "",
  body: "",
};

const Single_Note = ({ title, _id, body }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedData, setUpdatedData] = useState(initState);
  const dispatch = useDispatch();
  const notes = useSelector((store) => store.notesReducer.notes);

  const toast = useToast()

  useEffect(() => {
    const editData = notes.find((el) => el._id === _id);
    setUpdatedData(editData || initState);
  }, [_id, notes]);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const token = document.cookie?.split("=")[1];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = (id) => {
    dispatch(EditNotes(id, updatedData, token))
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: NOTES_PATCH_SUCCESS });
        // alert("Data edited");
        toast({
          title: 'Note Edited.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        dispatch(getNotes(token));
      })
      .catch((err) => {
        // console.log(err);
        dispatch({ type: NOTES_PATCH_ERROR });
        // alert("Request Failed");
        toast({
          title: 'Request Failed.',
          status: 'Error',
          duration: 5000,
          isClosable: true,
        })
      });
  };

  const handleDelete = (id) => {
    dispatch(DeleteNotes(token, id))
      .then((res) => {
        dispatch({ type: NOTES_DELETE_SUCCESS });
        // alert("Data deleted");
        toast({
          title: 'Note Deleted.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        dispatch(getNotes(token))
        // console.log(res.data);
      })
      .catch((err) => {
        dispatch({ type: NOTES_DELETE_ERROR });
        // console.log(err);
        // alert("Request failed");
        toast({
          title: 'Request Failed.',
          status: 'Error',
          duration: 5000,
          isClosable: true,
        })
      });
  };
  const getRandomColor = () => {
    const colors = [
      "#FFF3DA",
      "#FFD1DA",
      "#A7ECEE",
      "#FEFF86",
      "#A5F1E9",
      "#E3ACF9",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    Aos.init();
  }, [isHovered]);

  return (
    <Box
      key={_id}
      // border="2px solid black"
      boxSizing="border-box"
      p="20px"
      maxWidth={"250px"}
      //   maxHeight={"400px"}
      //   overflow="auto"
      borderRadius={"15px"}
      backgroundColor={getRandomColor()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Heading fontSize={"17px"} mb="10px">
        {title}
      </Heading>
      <Text>{body}</Text>

      {isHovered && (
        <HStack
          bgColor="whiteAlpha.700"
          p="10px"
          justifyContent={"space-evenly"}
          alignContent="flex-end"
          m="auto"
          mt="10px"
          borderRadius="10px"
          top="-10x"
        >
          <FiEdit onClick={onOpen} cursor="pointer" />
          <MdDelete cursor="pointer" onClick={() => handleDelete(_id)} color="red" size="20px" />
        </HStack>
      )}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Title"
                name="title"
                value={updatedData.title}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <Textarea
                placeholder="Note"
                name="body"
                value={updatedData.body}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                handleSubmit(_id), onClose();
              }}
              mr={3}
            >
              Edit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Single_Note;
