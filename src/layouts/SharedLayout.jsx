import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/MyNav";
export default function SharedLayout() {
  return (
    <>
      <Header />
      <Outlet />;
    </>
  );
}
