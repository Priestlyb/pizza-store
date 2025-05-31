import cookie from "cookie";

const handler = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Set secure HTTP-only cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", process.env.TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60, // 1 hour
        path: "/",
      })
    );
    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

export default handler;
