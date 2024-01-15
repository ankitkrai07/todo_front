import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotes } from "../Redux/notesReducer/action";
import Add_Notes from "./Add_Notes";

const NoNotes = () => {

    // const dispatch = useDispatch()

    // const token = document.cookie?.split("=")[1];
    // useEffect(() => {
    //   dispatch(getNotes(token));
    // }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        flexDirection:"column",
        marginTop:"200px"
      }}
    >
      <img width={"15%"} src="https://icons.veryicon.com/png/o/business/a-set-of-commercial-icons/notes-54.png" />

      <div style={{textAlign:"center", color:"grey"}}>
        <h2>No Notes found</h2>
        <p>You have no notes created yet </p>
        <p>Start adding new notes by cliking on the button below</p>

        <Add_Notes getNotes={getNotes} />
      </div>
    </div>
  );
};

export default NoNotes;
