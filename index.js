import express from 'express'
import cors from 'cors'
import { getTasks, getTask, addTask, updateTask, deleteTask} from './database.js'

const app = express()
const allowed_origin = "http://localhost:5173"

app.use(express.json())

app.use(cors({
    origin: allowed_origin
}))

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})

app.get("/api/tasks", async (req, res) => {
    const tasks = await getTasks()
    res.send(tasks)
})

app.get("/api/tasks/:id", async (req, res) => {
    const id = req.params.id
    const task = await getTask(id)
    res.send(task)
})

app.post("/api/tasks", async (req, res) => {
    console.log(req)
    const {description} = req.body
    const task = await addTask(description)
    res.status(201).send(task)
})

app.put("/api/tasks/:id", async (req, res) => {
    const {description} = req.body
    const result = await updateTask(id, description)
    res.status(200).send({success: "Task successfully updated."})
})

app.delete("/api/tasks/:id", async (req, res) => {
    const id = req.params.id
    const result = await deleteTask(id)
    res.status(200).send({success: "Task successfully deleted."})
})