import mongoose, { Document, Schema } from "mongoose";

interface Icategory extends Document {
    category_name: string;
}

const categorySchema = new Schema({
    category_name: { 
        type: String, 
        required: true,
        validate: {
            validator: function(text: string) {
                return text !== null && text.length > 0;
            },
            message: "O nome da categoria não pode estar vazio"
        }
    },
});

const Category = mongoose.model<Icategory>('category', categorySchema);

export default Category;


// import mongoose, { Document, Schema } from 'mongoose';

// interface ICategory extends Document {
//   category_name: string;
// }

// const categorySchema = new Schema({
//   category_name: { type: String, required: true },
// });

// const Category = mongoose.model<ICategory>('Category', categorySchema);

// export default Category;
