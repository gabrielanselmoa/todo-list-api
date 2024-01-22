
import { Router } from "express";
import { Request, Response } from "express";
import {Auth} from "../middlewares/auth"
import * as userController from "../controllers/userController"
import * as taskController from "../controllers/taskController"

const routes = Router()

routes.get("/ping", (req: Request, res: Response) => {
    res.send({pong: true})
})

// USER - JWT AUTH
routes.post("/register", userController.register)
routes.post("/login", userController.login)
routes.get("/users/all", Auth.private, userController.listUsers)

// TASKS - JWT AUTH
routes.post("/task/new", Auth.private, taskController.createTask)
routes.get("/task/all", Auth.private, taskController.listTask)
routes.get("/task/:id", Auth.private, taskController.listTaskID)
routes.put("/task/update/:id", Auth.private, taskController.updateTask)
routes.delete("/task/delete/:id", Auth.private, taskController.deleteTask)

export default routes;