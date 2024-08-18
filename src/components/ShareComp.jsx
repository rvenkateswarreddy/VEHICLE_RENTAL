import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const ShareComp = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ShareComp;
