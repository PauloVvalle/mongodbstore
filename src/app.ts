import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRoutes from './routes/product.routes';
// import cartProductRoutes from './routes/cartProduct.routes';
// import categoryRoutes from './routes/category.routes';
// import userRoutes from './routes/user.routes';
// import cartRoutes from './routes/cart.routes';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mongostore', {
  family: 4,
});

mongoose.connection.on("connected", () => {
    console.log("Conexão com o MongoDB estabelecida com sucesso!")
})
mongoose.connection.on("error", (err) => {
    console.error("Erro na conexão com o MongoDB:", err)
  })  

// Product Routes
app.use('/api/products', productRoutes);

// // Categories Routes
// app.use('/api/categories', categoryRoutes);

// // Users Routes
// app.use('/api/users', userRoutes);

// // Carts Routes
// app.use('/api/carts', cartRoutes);

// // CartProducts Routes
// app.use('/api/cartProducts', cartProductRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});