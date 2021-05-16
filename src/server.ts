import express from 'express';
import { createTask, deleteTask, listTasks, updateTask } from './routes';

import './database';

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ message: 'Via ToDo API! New' })
});

app.get('/tasks', listTasks);
app.post('/tasks', createTask);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

app.listen(3333);