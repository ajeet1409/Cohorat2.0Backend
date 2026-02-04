import React from 'react'
import Card from './Card'
import Form from './Form'

const Main = () => {
  return (
    <div>
        <h2>Add User</h2>
        
              <Form/>
        
             <h2 className='py-3'>All Users</h2>
             <Card/>
    </div>
  )
}

export default Main
