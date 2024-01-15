import React from "react";
import { Route, Routes } from "react-router-dom";
import { EditNotes } from "../Redux/notesReducer/action";
import AllNotes from "./AllNotes";
import Home from "./Home";
import Login from "./Login";
import Private_Route from "./Private_Route";
import Register from "./Register";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/notes"
        element={
          <Private_Route>
            <AllNotes />
          </Private_Route>
        }
      />
      <Route
        path="/update/:id"
        element={
          <Private_Route>
            <EditNotes />
          </Private_Route>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
