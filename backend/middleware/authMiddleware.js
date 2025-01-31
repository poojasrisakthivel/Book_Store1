import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import {User} from "../models/userModel.js"
//require('dotenv').config();

/*export const protect = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};*/

/*
export const protect = async(req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];  // Ensure you are extracting the token correctly
  
    if (!token) return res.status(401).json({ message: "Access denied" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token with the same secret
    //   req.user = decoded;
    //getting the user 
    req.user = await User.findById(decoded.id).select('-password');
      next();  // Proceed to the next middleware or route
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };

  */
  export const protect = async (req, res, next) => {
    let token;
  
    // Check if token exists in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        // Extract token
        token = req.headers.authorization.split(" ")[1];
        //token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzlhMjhlY2NkNDM5NzkwNGI3ZDg5ZWIiLCJpYXQiOjE3MzgxNzExNDEsImV4cCI6MTc0MDc2MzE0MX0.Mu_VLy-LcL77bL9KaVWAz1AYxjL4_IJOxI0bcgKrGK4"
  
        // Verify token
        //const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const decoded = jwt.decode(token)
        //console.log("Decoded User ID:", decoded.userId);
  
        // Find user by decoded ID and attach to request
        req.user = await User.findById(decoded.userId).select("-password"); 
  
        if (!req.user) {
          return res.status(401).json({ message: "User not found" });
        }
  
        next(); // Move to next middleware
      } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
      }
    }
  
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  };
  
  
  