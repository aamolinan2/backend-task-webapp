import { Router } from 'express';
import { UserService } from '../services/user.service';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const service = new UserService();

router.post('/login', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const { user } = await service.findOrCreateUser(email);
    const token = jwt.sign({ uid: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: Number(process.env.JWT_EXPIRES_IN) || 3600,
    });
    return res.json({ email: user.email, token });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error });
  }
});

// POST /users - Crear o retornar usuario
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const { user, created } = await service.findOrCreateUser(email);
  res.status(created ? 201 : 200).json(user);
});

// GET /users/:email - Buscar usuario por email
router.get('/:email', async (req, res) => {
  const user = await service.getUserByEmail(req.params.email);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

export default router;
