import { Request, Response } from 'express';
import Category from '../models/category.model';

// READ - Obter todos os produtos
export const getAllcategories = async (req: Request, res: Response) => {
  try {
    console.log('controller ok')
    const categories = await Category.find();
    console.log(categories)
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};