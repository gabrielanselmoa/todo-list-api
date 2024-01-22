
import { Request, Response } from "express"
import {prisma} from "../database"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// ROUTES API - FUNCTIONS

type UserRegister = {email: string, password: string, name:string}

// Register --> Sign-up
export const register = async (req: Request, res: Response) => {

    try {
        if(req.body.name && req.body.email && req.body.password){

            const {email, password, name} = req.body as UserRegister
            let hasUser = await prisma.user.findFirst({
                where:{email}
            })
        
            if(!hasUser){
                let newUser = await prisma.user.create({
                    data: {name, email, password}
                })
            
                const token = JWT.sign(
                    {id: newUser.id, email: newUser.email},
                    process.env.JWT_SECRET_KEY as string,
                    {expiresIn: "2h"})
                res.json({status: true, token})
                res.status(201).json({Message: "User created successfully!", id: newUser.id})
            }else{
                res.json({Error: "User already exists!"})
            }
        }
    } catch (error) {
        
    }
}

// Login --> Sign-in
export const login = async (req: Request, res: Response) => {

    if(req.body.email && req.body.password){

        const {email, password} = req.body

        let user = await prisma.user.findFirst({where:{email, password}})

        if(user){
            const token = JWT.sign(
                {id: user.id, email: user.email},
                process.env.JWT_SECRET_KEY as string,
                {expiresIn: "2h"})
            res.json({status: true, token})

        }else{
            res.json({Error: "User not exists!"})
        }
    }

    res.json({message: "Email or password were not sent!!"})
}

// List Users
export const listUsers = async (req: Request, res: Response) => {

    const {name, email, password} = req.body

    let users = await prisma.user.findMany()

    if(users.length > 0){
        res.json({users})
    }else{
        res.json({Error: "There's no users!"})
    }
}

