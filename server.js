import express from 'express'
import { connection } from './database/tododatabase.js';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json())

app.get('/read', async (req, res) => {
    try {
        const [result, fields] = await connection.execute("SELECT * from todo");
        res.json({ message: 'fetching successfully', data: result }).status(200)

    } catch (error) {
        console.log(error);
        res.json({ message: error.message })
    }
})

app.post('/create', async (req, res) => {
    try {
        const { todos } = req.body
        const [result, fields] = await connection.execute(`INSERT INTO todo (todos) VALUES ('${todos}')`)
        res.json({ message: 'successfully created', data: result }).status(201)
        console.log(result)
    } catch (error) {
        console.log(error);
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [result, fields] = await connection.execute(` DELETE FROM todo WHERE id = ${id}`)
        res.json({ message: 'deleted successfully', data: result }).status(200)
        console.log(id)
    } catch (error) {
        console.log(error);
    }
});

app.listen(3000, () => {
    console.log('port listening on port 3000')
})