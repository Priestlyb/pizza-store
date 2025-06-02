import dbConnect from "../../../lib/mongo";
import Pizza from "../../../models/Pizza";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token;

  // Connect to DB
  try {
    await dbConnect();
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    return res.status(500).json({ message: "Database connection error" });
  }

  switch (method) {
    case "GET":
      try {
        const pizzas = await Pizza.find();
        console.log("✅ Pizzas fetched successfully:", pizzas.length);
        return res.status(200).json(pizzas);
      } catch (err) {
        console.error("❌ Failed to fetch pizzas:", err);
        return res
          .status(500)
          .json({ message: "Failed to fetch pizzas", error: err.message });
      }

    case "POST":
      // Token check
      if (!token || token !== process.env.TOKEN) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { title, desc, img, prices, extraOption } = req.body;

      // Input validation
      if (
        !title ||
        typeof title !== "string" ||
        title.length > 60 ||
        !desc ||
        typeof desc !== "string" ||
        desc.length > 200 ||
        !img ||
        typeof img !== "string" ||
        !Array.isArray(prices) ||
        prices.some((p) => typeof p !== "number") ||
        !Array.isArray(extraOption) ||
        extraOption.some((opt) => !opt.text || !opt.price)
      ) {
        return res
          .status(400)
          .json({ message: "Invalid or missing pizza fields" });
      }

      try {
        const newPizza = await Pizza.create({
          title,
          desc,
          img,
          prices,
          extraOption,
        });
        return res.status(201).json(newPizza);
      } catch (err) {
        console.error("❌ Failed to create pizza:", err);
        return res
          .status(500)
          .json({ message: "Failed to create pizza", error: err.message });
      }

    default:
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
