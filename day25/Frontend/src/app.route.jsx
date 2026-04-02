import  {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FaceExpression from './features/expression/pages/FaceExpression'
import Protected from './features/auth/components/Protected'
import Home from './features/home/pages/Home'



const router = createBrowserRouter([
    {
        path:'/',
        element:<Protected><Home/></Protected>
    }
    ,
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    }

])

export default router