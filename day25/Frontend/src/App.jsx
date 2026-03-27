import React from "react";
import "./features/shared/style/global.scss"
import { RouterProvider } from 'react-router'
import router from './app.route'
import FaceExpression from "./features/expression/pages/FaceExpression"; 

const App = () => {
  return (
    <>
      {/* <FaceExpression/> */}

      <RouterProvider router={router}/>



    </>
  );
};

export default App
