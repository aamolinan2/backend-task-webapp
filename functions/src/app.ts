import express from 'express';
import taskRoutes from './controllers/task.controller';
import userRoutes from './controllers/user.controller';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

export default app;