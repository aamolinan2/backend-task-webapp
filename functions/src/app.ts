import express from 'express';
import taskRoutes from './controllers/task.controller';
import userRoutes from './controllers/user.controller';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();


const app = express();

app.use(cors({
  origin: ['https://frontend-task-webapp.web.app', 'http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

export default app;