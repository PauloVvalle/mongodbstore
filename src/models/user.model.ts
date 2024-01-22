import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser extends Document {
    // _id: mongoose.Types.ObjectId;
    user_name: string;
    user_username: string;
    user_password: string;
    user_role: string;
    user_image: string;
    user_email: string;
    user_phone: string;
    user_city: string;
    user_street: string;
    user_number: number;
    user_cep: string;
}

const userSchema = new Schema({
    user_name: { type: String, required: true },
    user_username: { type: String, required: true },
    user_password: { type: String, required: true },
    user_role: { type: String, enum: ['user', 'admin']},
    user_image: { type: String, required: true },
    user_email: { type: String, required: true, match: /.+\@.+\..+/ },
    user_phone: { type: String, required: true },
    user_city: { type: String, required: true },
    user_street: { type: String, required: true },
    user_number: { type: Number, required: true },
    user_cep: { type: String, required: true },
});

// userSchema.pre<IUser>('save', async function(next) {
//     if (this.isModified('user_password')) {
//         const salt = await bcrypt.genSalt();
//         this.user_password = await bcrypt.hash(this.user_password, salt);
//     }
//     next();
// });

const User = mongoose.model<IUser>('User', userSchema);

export default User;