import { useState } from "react"
import { useParams ,useNavigate,Link} from "react-router-dom"
import API from "../Api"



const Edit = () => {
const navigate = useNavigate()
  const [updateUsername, setUpdateUsername] = useState("")

  const {id} = useParams()
  console.log(id)

  const data = {
    username:updateUsername
  }
  console.log(data)

  const userUpdate= async (e)=>{
    e.preventDefault()

       await API.patch(`/user/update/${id}`,data,{
        headers:{
          "Content-Type":"application/json"
        }
      })
      
      alert("update successfully")

      navigate("/")

  }




  return (
    <div>
      <form onSubmit={userUpdate}>

          <input
          className=" border-1xl border-gray-800 m-1 block px-4 py-2 outline-one"
          onChange={(e)=>setUpdateUsername(e.target.value)}
          placeholder="username"
          name="username"
          type="text"
          value={updateUsername}
        />
        <button className='px-2 py-2 bg-blue-700'>Update</button>
      </form>
    </div>
  )
}

export default Edit