
// import { Request, Response } from "express"
// import {prisma} from "../database"
// import JWT from "jsonwebtoken"
// import dotenv from "dotenv"

// type TaskType = {
//     id: number,
//     title: string,
//     description?: string,
//     status: boolean
// }

// // CREATE TASKS
// export const createTask = async (req: Request, res: Response) => {

//     try {
//         if(req.body.title){

//             const {title, description, status} = req.body as TaskType
//             let task = await prisma.task.findFirst({where:{title}})
    
//             if(!task){
//                 let newTask = await prisma.task.create({
//                     data:{title, description, status}
//                 })
//                 res.status(201).json({Message: "Task created successfully!", id: newTask.id})
//             }else{
//                 res.json({Error: "Task already exists!!"})
//             }
//         }
//         // res.json({Error: "title and status were not sent!!"})
//     } catch (error) {
        
//     }
// }

// // LIST TASKS BY ID
// export const listTaskID = async (req: Request, res: Response) => {

//     const {id} = req.params
//     let task = await prisma.task.findFirst({where:{id: Number(id)}})

//     if(task){
//         res.json({task})
//     }else{
//         res.json({Error: "There's no tasks with this ID!"})
//     }
// }

// // LIST TASKS
// export const listTask = async (req: Request, res: Response) => {

//     const {title, description, status} = req.body
//     let task = await prisma.task.findMany()

//     if(task.length > 0){
//         res.json({task})
//     }else{
//         res.json({Error: "There's no tasks!"})
//     }
// }

// // UPDATE TASKS BY ID
// export const updateTask = async (req: Request, res: Response) => {

//     const {id} = req.params
//     const {title, description, status} = req.body as TaskType

//     let task = await prisma.task.findFirst({where:{id: Number(id)}})

//     if(task){
//         let updatedTask = await prisma.task.update({
//             where:{id: Number(id)},
//             data:{title, description, status}
//         })
//         res.json({task})
//     }else{
//         res.json({Error: "There's no tasks with this ID!"})
//     }
// }

// // DELETE TASKS BY ID
// export const deleteTask = async (req: Request, res: Response) => {

//     const {id} = req.params
//     // const {title, description, status} = req.body as TaskType

//     let task = await prisma.task.findFirst({where:{id: Number(id)}})

//     if(task){
//         let deletedTask = await prisma.task.delete({
//             where:{id: Number(id)}
//         })
//         res.status(201).json({message: `the ${deletedTask.id} task was successfully deleted!!`})
//     }else{
//         res.json({Error: "There's no tasks with this ID!"})
//     }
// }
