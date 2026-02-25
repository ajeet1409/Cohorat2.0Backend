import jwt from 'jsonwebtoken'

const isloggin = (req,res,next)=>{

    try {

        const token = req.cookies.token
        
        if(!token) return res.status(401).json({
            message:"user is not authenticated"
        })

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded)
         req.user= decoded
        
        next()

        
    } catch (error) {

          res.clearCookie("token")
    console.log(error);
      return res.status(401).json({message:"token not found or authorized"})
        
    }
}
export default isloggin