import mongoose from "mongoose";

const PizzaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 60 },
    desc: { type: String, required: true, maxLength: 200 },
    img: { type: String, required: true },
    prices: { type: [Number], required: true },
    extraOption: [
      {
        text: { type: String },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Pizza || mongoose.model("Pizza", PizzaSchema);
