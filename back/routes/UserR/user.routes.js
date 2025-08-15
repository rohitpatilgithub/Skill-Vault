import express from 'express';
import { createUser , loginUser , getUser } from '../../controllers/user.controller.js';

const route = express.Router();

route.get('/',getUser);
route.post('/signup',createUser);
route.post('/login',loginUser);

const userRoutes = route;

export default userRoutes;