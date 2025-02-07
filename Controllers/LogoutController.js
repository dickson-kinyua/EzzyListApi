export const logout = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(400).json({ error: "No token provided" });
  }
  try {
    res.cookie("token", "").json("logout successful");
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
