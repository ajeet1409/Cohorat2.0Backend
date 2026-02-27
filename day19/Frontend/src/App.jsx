import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toast";
import AppRoute from "./AppRoutes.jsx";
import { AuthProvider } from "./features/auth.context.jsx";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
        />

        <AppRoute />
      </AuthProvider>
    </div>
  );
};

export default App;
