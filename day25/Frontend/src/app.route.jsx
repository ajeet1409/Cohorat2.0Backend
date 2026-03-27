import  {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FaceExpression from './features/expression/pages/FaceExpression'
import Protected from './features/auth/components/Protected'



const router = createBrowserRouter([
    {
        path:'/',
        element:<Protected><h1>Hellooo...</h1></Protected>
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