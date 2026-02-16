import React, { useEffect, useState } from "react";
import { getAllUser, deleteuser } from "../ApiResponse";
import { Link } from "react-router-dom";
import API from "../Api";

export const Card = ({userD}) => {
  console.log(import.meta.env.VITE_BASE_URL)
  const [userData, setUserData] = useState([]);
  const [show, setshow] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUser();
      console.log("res in card", res.data);
      setUserData(res.data.alluser);
    };
    fetchData();
  }, [userD]);

  console.log(userData);
  let printUserData = (
    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
      Loading....
    </h1>
  );
  if (userData.length > 0) {
    printUserData = (
      <div className="flex gap-3 w-full flex-wrap">
        {userData.map((user, key) => {
          return (
            <div
              key={key}
              className="h-60 w-50 bg-white  rounded-xl shadow-lg  gap-2 p-2 "
            >
              <div className=" px-2 py-2 flex justify-between items-center rounded-full">
                <button
                  className="bg-red-400 px-2 py-2  rounded-full cursor-pointer"
                  onClick={() => deleteUserId(user._id)}
                >
                  del
                </button>
                <button  onClick={()=>setshow(false)} className="bg-emerald-400 px-2 py-2 rounded-full">
                  {" "}
                  {/* Link */}
                  <Link to={`/edit/${user._id}`}> Edit</Link>
                </button>
              </div>
              <div className="mt-2">
                <h2 className=" text-balance ">{user.username}</h2>
                <h2 className=" text-balance ">{user.email}</h2>

                {
                  !show &&(
                    <div>
                      <h1>helllo</h1>
                      <button onClick={()=>setshow(true)}>update</button>
                    </div>
                  )
                }

              </div>
            </div>
          );
        })}
      </div>
    );
  }else{
      printUserData =    <h2>no user available</h2>
  }

  // delete user

  const deleteUserId = async (id) => {
    // console.log(id);

    // console.log("hello");
    const res = await deleteuser(id);
    console.log(res.data);

    const remaingUser = userData.filter((user) => id !== user._id);
    console.log(remaingUser);
    setUserData(remaingUser);
  };

  // edit user

  return (
    <div>
      <div>{printUserData}</div>
    </div>
  );
};
export default Card;
