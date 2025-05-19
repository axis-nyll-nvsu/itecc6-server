import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getTasks() {
    const [rows] = await pool.query("SELECT * FROM tasks")
    return rows
}

export async function getTask(id) {
    const [rows] = await pool.query(`
        SELECT id, description
        FROM tasks
        WHERE id = ?
        `, [id])
    return rows[0]
}

export async function addTask(description) {
    const [result] = await pool.query(`
        INSERT INTO tasks(description)
        VALUES (?)
        `, [description])
    const id = result.insertId
    return getTask(id)
}

export async function updateTask(description) {
    const [result] = await pool.query(`
        UPDATE tasks
        SET
            description = ?
        WHERE id = ?
        `, [description, id])
    return result
}

export async function deleteTask(id) {
    const [result] = await pool.query(`
        DELETE FROM tasks
        WHERE id = ?
        `, [id])
    return result
}