import jwt from "jsonwebtoken";

export const isLoggin = (req, res, next) => {
  token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
     
    res.clearCookie('token')
       return res.status(401).json({ message: 'Invalid token' });

  }
};

