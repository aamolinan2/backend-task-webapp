import express from 'express';
import taskRoutes from './controllers/task.controller';
import userRoutes from './controllers/user.controller';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());


// Rutas
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// Inicio del servidor (solo para entorno local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
