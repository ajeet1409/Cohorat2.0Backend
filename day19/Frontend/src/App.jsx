import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toast";
import AppRoute from "./AppRoutes.jsx";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
      />
      <AppRoute />
    </div>
  );
};

export default App;
