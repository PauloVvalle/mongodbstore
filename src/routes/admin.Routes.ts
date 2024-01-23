import express from 'express';
import checkRole from '../middlewares/checkRoleMiddleware';

const router = express.Router();

router.get('/admin', checkRole('admin'), (req, res) => {
  res.send('Bem-vindo à página do administrador.');
});

export default router;
