import express from 'express';
import * as userController from '../controllers/user.controller';
import checkRole from '../middlewares/checkRoleMiddleware';

const router = express.Router();
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getUser);

router.get('/user', checkRole('user'), (req, res) => {
    res.send('Bem-vindo à página do usuário.');
  });


export default router;