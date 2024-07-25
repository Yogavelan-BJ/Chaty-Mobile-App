import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const user = req.user;
    const users = await User.find({ _id: { $ne: user._id } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.log("error in getUsers controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
