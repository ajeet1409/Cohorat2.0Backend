import mongoose from "mongoose";


//import model 

import  userModel from '../models/User.js'

const mongodb_uri = 'mongodb://127.0.0.1:27017/practice'


const users = [
  {
    username: 'Super Admin',
    email: 'superadmin@qgenii.com',
    password: 'admin123',
   
  },
  {
    username: 'Admin User',
    email: 'admin@qgenii.com',
    password: 'admin123',
   
  },
  {
    username: 'John Mentor',
    email: 'mentor@qgenii.com',
    password: 'mentor123',
   
  },
  {
    username: 'Jane Mentor',
    email: 'mentor2@qgenii.com',
    password: 'mentor123',
   
  },
  {
    username: 'Hiring Partner',
    email: 'partner@qgenii.com',
    password: 'partner123',
    
  },
  {
    username: 'Tech Corp Recruiter',
    email: 'recruiter@techcorp.com',
    password: 'partner123',
   
  },
  {
    username: 'StartUp HR Manager',
    email: 'hr@startup.com',
    password: 'partner123',
   
  },
  {
    username: 'Global Solutions Talent',
    email: 'talent@globalsolutions.com',
    password: 'partner123',
   
  },
  {
    username: 'Regular User',
    email: 'user@qgenii.com',
    password: 'user123',
    
  },
  // Additional users for job applications
  {
    username: 'Alice Johnson',
    email: 'alice.j@email.com',
    password: 'user123',
    
  },
  {
    username: 'Bob Smith',
    email: 'bob.smith@email.com',
    password: 'user123',
    
  },
  {
    username: 'Charlie Davis',
    email: 'charlie.d@email.com',
    password: 'user123',
    
  },
  {
    username: 'Diana Martinez',
    email: 'diana.m@email.com',
    password: 'user123',
    
  },
  {
    username: 'Ethan Wilson',
    email: 'ethan.w@email.com',
    password: 'user123',
    
  },
  {
    username: 'Fiona Brown',
    email: 'fiona.b@email.com',
    password: 'user123',
    
  },
  {
    username: 'George Taylor',
    email: 'george.t@email.com',
    password: 'user123',
    
  },
  {
    username: 'Hannah Lee',
    email: 'hannah.l@email.com',
    password: 'user123',
    
  },
  {
    username: 'Ian Chen',
    email: 'ian.c@email.com',
    password: 'user123',
    
  },

 
];

const seedData = async ()=>{

   await mongoose.connect(mongodb_uri).then(()=>console.log("mongodb is connect"))

   // Clear existing data
    await userModel.deleteMany({});


   const createUser=  await userModel.create(users)
     console.log(`✅ Created ${createUser.length} users`);


}

seedData()