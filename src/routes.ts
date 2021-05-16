import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import Task from './models/Task';
import TaskRepository from './repositories/TaskRepository';

export async function createTask(request: Request, response: Response) {
    try {
        const { title, description } = request.body;
        const taskRepository = getCustomRepository(TaskRepository);
        const taskModel = new Task();
        taskModel.title = title;
        taskModel.description = description;
        const task = await taskRepository.save(taskModel);
    
        return response.json(task);
    } catch (err) { }
    
    return response.json({message: 'Erro ao criar registro!'}).status(500);
    
}
export async function updateTask(request: Request, response: Response) {
    try {
        
    
        const { id } = request.params;
        const { title, description, status } = request.body;
        const taskRepository = getCustomRepository(TaskRepository);
        const task = await taskRepository.findOne(id);
        if (task) {
            
            task.title = title;
            task.description = description;
            task.status = status;
            task.updated_at = new Date();
            taskRepository.save(task);
            return response.json(task);
        }
        return response.json({message: 'Registro não encontrado!'}).status(404);
    } catch (err) { }
    
    return response.json({message: 'Erro ao atuaizar registro!'}).status(500);
}
export async function deleteTask(request: Request, response: Response) {
    try {
        
        
    const { id } = request.params;
    const taskRepository = getCustomRepository(TaskRepository);
    const task = await taskRepository.findOne(id);
    if (task) {
        taskRepository.remove(task);
        return response.json({message: 'Registro excluído com sucesso!'});
    }
        return response.json({ message: 'Registro não encontrado!' }).status(404);
    } catch (err) { }
    
    return response.json({message: 'Erro ao excluir registro!'}).status(500);
    
}
export async function listTasks(request: Request, response: Response) {
    const taskRepository = getCustomRepository(TaskRepository);
    const tasks = await taskRepository.find();
    return response.json({ data: tasks });
}
