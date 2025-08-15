import express from 'express';
import { verifyUser } from '../../middlewares/auth.middleware.js';
import { createTask, deleteTask, getFilteredTasks, getTask, putTask } from '../../controllers/task.controller.js';

const route = express.Router();


route.get('/',verifyUser,getTask);
route.post('/',verifyUser,createTask);
route.delete('/:id',verifyUser,deleteTask);
route.put('/:id',verifyUser,putTask);
// route.patch('/:id',verifyUser,patchTaskStatus);

route.get('/filtered',verifyUser,getFilteredTasks);

const taskRoutes = route;

export default taskRoutes;