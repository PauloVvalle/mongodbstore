import express from 'express';
import User from '../models/user.model';

const checkRole = (role: string) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const username = req.headers.username as string;
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }
  
    if (user.user_role !== role) {
      return res.status(403).send(`Acesso negado. Apenas ${role}s podem acessar esta página.`);
    }
  
    next();
  };

  export default checkRole;