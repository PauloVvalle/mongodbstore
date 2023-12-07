import mongoose from "mongoose";
import Category from "../models/category.model";

const seedCategory = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mongostore');

  } catch (error) {
    console.error("Erro na conexão com o MongoDB:", error);
    return;
  }

  try {
    mongoose.connection.on("connected", async () => {
      const qtdSeeds = 5;
      for (let index = 0; index < qtdSeeds; index++) {
        const newCategory = new Category({
          category_name: "Categoria" + index,
        });
        await newCategory.save();
      }
      console.log("Categorias criadas com sucesso");
    });
  } catch (error) {
    console.log("ERROR:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedCategory();





















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
