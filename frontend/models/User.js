import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional because social sign-in won't have a password
    image: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    provider: { type: String, default: 'credentials' } // To track if they signed up via google/facebook
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
