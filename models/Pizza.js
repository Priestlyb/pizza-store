import mongoose from "mongoose";

const { Schema } = mongoose;

const pizzaSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    prices: { type: [Number], required: true },
    extraOption: [
      {
        text: { type: String },
        price: { type: Number },
      },
    ],
    img: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Pizza || mongoose.model("Pizza", pizzaSchema);
