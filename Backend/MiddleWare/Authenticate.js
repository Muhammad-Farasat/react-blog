import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();



const Authenticate = async (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");
      console.log("Authorization Header:", authHeader);
  
      if (!authHeader) {
        return res.status(401).json({ error: "Token not provided" });
      }
  
      const token = authHeader.split(" ")[1];
      console.log("Extracted Token:", token);
  
      if (!token) {
        return res.status(401).json({ error: "Token missing from header" });
      }
  
      const data = jwt.verify(token, process.env.SECRET_KEY); // Verify with your secret key
      console.log("Decoded Token Data:", data);
  
      req.user = data;
      next();
    } catch (error) {
      console.error("Invalid Token Error:", error.message);
      res.status(403).json({ error: "Invalid or expired token" });
    }
  };
  

export default Authenticate;
