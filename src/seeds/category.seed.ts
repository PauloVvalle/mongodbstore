import mongoose from 'mongoose';
import Category from '../models/category.model';

const seedCategories = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mongostore', {
      family: 4,
    });
    
    const categoriesData = [
      { category_name: 'Electronics' },
      { category_name: 'Clothing' },
      { category_name: 'Books' },
      // Adicione mais categorias conforme necessário
    ];

    await Category.insertMany(categoriesData);
    console.log('Categories seeded successfully.');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedCategories();

// import mongoose from "mongoose";
// import Category from "../models/category.model";

// const seedCategory = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/mongostore', {
//       family: 4,
//     });

//   } catch (error) {
//     console.error("Erro na conexão com o MongoDB:", error);
//     return;
//   }

//   try {
//     mongoose.connection.on("connected", async () => {
//       const qtdSeeds = 5;
//       for (let index = 0; index < qtdSeeds; index++) {
//         const newCategory = new Category({
//           category_name: "Categoria" + index,
//         });
//         await newCategory.save();
//       }
//       console.log("Categorias criadas com sucesso");
//     });
//     mongoose.disconnect();
//   } catch (error) {
//     console.log("ERROR:", error);
//   } finally {
//     mongoose.disconnect();
//   }
// }

// seedCategory();





















// import mongoose from "mongoose";
// import Category from "../models/category.model";

// const seedCategory = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/mongostore');
//     mongoose.connection.on("connected", async () => {
//       const qtdSeeds = 5;
//       for (let index = 0; index < qtdSeeds; index++) {
//         const newCategory = new Category({
//           category_name: "Categoria" + index,
//         });
//         await newCategory.save();
//       }
//       console.log("Categorias criadas com sucesso");
//     });
//   } catch (error) {
//     console.log("ERROR:", error);
//   } finally {
//     mongoose.disconnect();
//   }
// }

// seedCategory();
