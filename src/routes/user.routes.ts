import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getUser);

export default router;