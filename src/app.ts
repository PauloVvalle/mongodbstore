import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRoutes from './routes/product.routes';
// import cartProductRoutes from './routes/cartProduct.routes';
import categoryRoutes from './routes/category.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import path from 'path';
// import cartRoutes from './routes/cart.routes';
import cors from 'cors';

require('dotenv').config()

const app = express();
const PORT = 3000;



const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition'],
};


// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions))

mongoose.connect(process.env.DB_URI! as string, {
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
app.use('/api/categories', categoryRoutes);

// app.use(express.static('uploads'));
app.use('/imagem', express.static(path.join(__dirname, '../uploads')));

// // Users Routes
app.use('/api/users', userRoutes);

app.use('/auth', authRoutes);

// // Carts Routes
// app.use('/api/carts', cartRoutes);

// // CartProducts Routes
// app.use('/api/cartProducts', cartProductRoutes);



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});