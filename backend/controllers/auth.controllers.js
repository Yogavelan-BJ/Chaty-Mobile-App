import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { fullName, username, gender, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      res.status(400).json({ error: "passwords do not match" });
    } else {
      const user = await User.findOne({ username });
      if (user) {
        res.status(400).json({ error: "user already exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const newUser = new User({
          fullName,
          username,
          gender,
          password: hashedPassword,
          profilePic: gender === "male" ? boyPic : girlPic,
        });
        if (newUser) {
          const token = generateTokenAndSetCookie(newUser._id, res);
          await newUser.save();
          res.status(200).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
            token,
          });
        }
      }
    }
  } catch (error) {
    if (error.name == "ValidationError") {
      console.log("error in signup controller", error.message);
      res.status(400).json({ error: "User details not valid" });
    } else {
      console.log("error in signup controller", error.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const isPasswordVerified = await bcrypt.compare(
      password || "",
      user?.password || ""
    );
    if (!user || !isPasswordVerified || !password) {
      res.status(400).json({
        error: "username or password invalid",
      });
    } else {
      const token = generateTokenAndSetCookie(user._id, res);
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
        token,
      });
    }
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
