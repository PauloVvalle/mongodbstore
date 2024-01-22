import { Request, Response } from 'express';
import Product from '../models/product.model';
import mongoose from 'mongoose';

// READ - Obter todos os produtos
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
// export const getProductsByName = async (req: Request, res: Response) => {
//   try {
//     const products = await Product.find({ 'title': new RegExp(req.params.searchTerm, 'i') });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

export const getProductsByName = async (req: Request, res: Response) => {    
  try {
  const products = await Product.find({'title': { $regex: new RegExp ('.*' + req.params.name + '.*', "i") } });
      console.log(products)
      res.status(200).json(products);

  } catch (error) {
      res.status(500).json(error);
  }
}
export const DeleteProductsById = async (req: Request, res: Response) => {    
  try {
    const idToDelete = new mongoose.Types.ObjectId(req.params.id);
    const deleted = await Product.findOneAndDelete(idToDelete);
    console.log(deleted)
    res.status(200).json(deleted);

  } catch (error) {
    res.status(500).json(error);
  }
}
