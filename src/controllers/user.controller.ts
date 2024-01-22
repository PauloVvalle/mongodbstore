import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import  User from '../models/user.model';
import mongoose from 'mongoose';
import fileUpload from '../middlewares/fileUploadMiddleware';

const saltRounds = 10;
const jsonSecret = 'jhaissdfsdvsqwhdiash';
// export const createUser = async (req: Request, res: Response) => {
//     try {
//         fileUpload.single('user_image')(req, res, async (err: any) => {
//             if (err) {
//                 console.error('Erro ao fazer upload da imagem: ', err)
//                 res.status(500).json({ error: 'Erro ao fazer upload de imagem' })
//                 return;
//             }
//             const hashPassword = await bcrypt.hash(req.body.user_password, saltRounds)
//             console.log(hashPassword);
//             req.body.user_password = hashPassword;

//             // const user_image = req.file ? req.file.filename : '';

//             // let user_image = '';
//             // if (req.file) {
//             //     user_image = req.file.filename;
//             // }

//             let user_image;
// if (req.file && req.file.filename) {
//     user_image = req.file.filename;
// } else {
//     // Trate o caso em que não há imagem enviada ou o nome do arquivo é vazio
//     console.error('Nenhuma imagem enviada ou o nome do arquivo é vazio');
//     res.status(400).json({ error: 'Nenhuma imagem enviada ou o nome do arquivo é vazio' });
//     return;
// }

//             req.body.user_image = user_image;

//             const newUser = new User(req.body);
//             const savedUser = await newUser.save();
//             res.status(200).json(savedUser);

//         })

//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        fileUpload.single('user_image')(req, res, async (err: any) => {
            if (err) {
                console.error('Erro ao fazer upload da imagem: ', err)
                res.status(500).json({ error: 'Erro ao fazer upload de imagem' })
                return;
            }
            const hashPassword = await bcrypt.hash(req.body.user_password, saltRounds)
            console.log(hashPassword);
            req.body.user_password = hashPassword;

            let user_image: string;
            if (req.file && req.file.filename) {
                user_image = req.file.filename;
            } else {
                console.error('Nenhuma imagem enviada ou o nome do arquivo é vazio');
                res.status(400).json({ error: 'Nenhuma imagem enviada ou o nome do arquivo é vazio' });
                return;
            }

            req.body.user_image = user_image;

            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const idToDelete = new mongoose.Types.ObjectId(req.params.id);
        const deletedUser = await User.findOneAndDelete(idToDelete);
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const authUser = async (req: Request, res: Response) => {
    const { user_username, user_password } = req.body;

    console.log('Autenticando usuário:', user_username); // Log do nome de usuárioa

    const user = await User.findOne({'user_username': user_username});

    console.log('Usuário encontrado:', user); // Log do usuário encontrado

    if(!user){
        res.status(500).json({'error': 'Usuário não encontrado'});
        return;
    }

    const isPassValid = await bcrypt.compare(user_password, user.user_password);

    console.log('Senha válida:', isPassValid); // Log da validade da senha

    if(!isPassValid){
        res.status(500).json({'error': 'Senha não encontrada'});
        return;
    }

    const token = jwt.sign({user_id: User}, jsonSecret, {expiresIn: '3000m'})
    
    console.log('Token gerado:', token); // Log do token gerado

    res.status(200).json({'token': token , 'user': user });
}
export const getUser = async (req: Request, res: Response) => {
    const user: typeof User | null = await User.findById(req.params.id);
    res.json(user);
  };