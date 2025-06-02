import dbConnect from "../../../pages/util/mongo";
import Pizza from "../../../models/Pizza";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  dbConnect();
  const token = cookies.token;

  /* Get fuction */

  if (method === "GET") {
    try {
      const pizza = await Pizza.findById(req.query.id);
      if (!pizza) return res.status(404).json({ message: "Pizza not found" });
      res.status(200).json(pizza);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  /* Add fuction */

  if (method === "PUT") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      const pizza = await Pizza.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(pizza);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  /* Delete fuction */

  if (method === "DELETE") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      await Pizza.findByIdAndDelete(id);
      res.status(200).json("The Pizza has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
