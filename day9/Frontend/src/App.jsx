import React from 'react'
import Main from './Components/Main'
import Edit from './Components/Edit'
import { Routes ,Route} from 'react-router-dom'


const App = () => {
  return (
    <div className="p-2 bg-gray-600 h-screen">
      

     <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path="/edit/:id" element={<Edit/>} />
     </Routes>
      
    </div>
  ) 
}

export default App