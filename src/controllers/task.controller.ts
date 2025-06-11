
import { Router } from 'express';
import { TaskService } from '../services/task.service';
import admin from '../utils/firebase';

const router = Router();
const service = new TaskService();

// Middleware para verificar token de Firebase
router.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('No token provided');
  const token = authHeader.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    // Adjunta userId a la request para usarlo en el servicio
    (req as any).userId = decoded.uid;
    return next();
  } catch {
    return res.status(401).send('Invalid token');
  }
});

// Listar tareas
router.get('/', async (req, res) => {
  const tasks = await service.getTasksByUser((req as any).userId);
  res.json(tasks);
});

// Crear tarea
router.post('/', async (req, res) => {
  const task = await service.createTask((req as any).userId, req.body);
  res.status(201).json(task);
});

// Actualizar tarea
router.put('/:id', async (req, res) => {
  const updated = await service.updateTask(req.params.id, { ...req.body, userId: (req as any).userId });
  res.json(updated);
});

// Eliminar tarea
router.delete('/:id', async (req, res) => {
  await service.deleteTask(req.params.id);
  res.status(204).send();
});

export default router;
