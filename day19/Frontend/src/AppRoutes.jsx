import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";

const AppRoute = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoute

// export const route = BrowserRouter([
//     {
//         path:'/login',
//         element:<Login/>

//     },
//     {
//         path:'/register',
//         element:<Register/>

//     }
// ])
