import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { EditNotes } from "../Redux/notesReducer/action";
import { NOTES_PATCH_SUCCESS } from "../Redux/actionTypes";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Edit_Notes = ({ id, title, body }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Title, setTitle] = useState(title);
  const [Body, setBody] = useState(body);
//   const notes = useSelector();
  // console.log(id);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();
  // console.log(id);


  // console.log(Title, Body)
  //    const handleClick = ()=>{

  //    }

  const handleUpdate = () => {
    const note = {
      Title,
      Body,
    };
    //  dispatch(EditNotes(id)).then((res)=> {
    //     dispatch({type: NOTES_PATCH_SUCCESS, payload: })
    //  })
  };
  return (
    <Box>
      <span onClick={onOpen}>
        <FiEdit />
      </span>

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
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                placeholder="Note"
                value={Body}
                onChange={(e) => setBody(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Edit_Notes;
