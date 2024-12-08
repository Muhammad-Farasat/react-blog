import { json } from "express";
import User from "../Model/user.model.js";
import jwt from 'jsonwebtoken'

export const signup = async(req, res)=>{
    try {
        
        const {username, email, password} = req.body

        if (!username || !email || !password) {
           return res.status(400).json({message: "Fill all feilds..!"})
        }
        
        const user = new User({username, email, password})

        await user.save()

        const data = {id: user.id}

        const token = jwt.sign(data, process.env.SECRET_KEY)


        res.status(200).json({success:true, user, token})


    } catch (error) {
        res.status(500).json({error: "Error in signup..!"})
    }
}

export const login = async(req, res)=>{
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({error: "fill all feild..!"})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({error: "Not found user...!"})
        }
        if (password === user.password) {
                const token = jwt.sign({id: user.id}, process.env.SECRET_KEY)

                return res.status(200).json({user, token})

        } else {
            res.status(400).json({error: "Incorrect password."})
            console.log("Incorrect password");
        }
         

    } catch (error) {
        res.status(500).json({error: "Error in  login"})
        console.error("Error: ", error);
    }
}

export const adminLogin = async(req, res)=>{
    try {
        
        const {email, password} = req.body

        if (!email || !password) {
            res.status(400).json({message: "Fill all feilds"})
        }

        const adminEmail = "admin789@gmail.com"
        const adminPassword = "admin123"

        if (email === adminEmail && password === adminPassword) {

            const token = jwt.sign({email: email.adminEmail}, process.env.SECRET_KEY) 

            res.status(200).json({success: true, token})
        }
        else{
            res.status(400).json({error: "Incorrect Credentials"})
        }


    } catch (error) {
        res.status(500).json({error: "Error in admin login endpoint."})
    }
}
