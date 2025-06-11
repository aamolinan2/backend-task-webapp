import { authMiddleware } from '../middleware/auth.middleware';
import { Router } from 'express';
import { TaskService } from '../services/task.service';

const router = Router();

router.use(authMiddleware);
const service = new TaskService();

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
  const updated = await service.updateTask(req.params.id, {
    ...req.body,
    userId: (req as any).userId,
  });
  res.json(updated);
});

// Eliminar tarea
router.delete('/:id', async (req, res) => {
  await service.deleteTask(req.params.id);
  res.status(204).send();
});

export default router;