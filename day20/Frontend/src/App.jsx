import React from 'react'
import  './features/shared/global.scss'
import { RouterProvider } from 'react-router'
import {router} from './app.routes.jsx'
const App = () => {
  return (
    <>
  <RouterProvider router={router}/>
  <div>
    <h1>handleLogin</h1>
  </div>


     
    </>
  )
}

export default App