import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    badge: { type: String },
    rating: { type: Number, default: 4.5 },
    stock: { type: Number, default: 100 }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);
