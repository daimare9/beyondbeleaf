import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: If guest checkout is allowed
    email: { type: String, required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    stripeSessionId: { type: String },
    shippingAddress: {
        fullName: String,
        address: String,
        city: String,
        state: String,
        zip: String
    }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
