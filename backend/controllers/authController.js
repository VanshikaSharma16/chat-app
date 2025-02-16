import User from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmpassword, gender } = req.body;

    console.log("Request body:", req.body); // Debugging

    if (!username || username.trim() === "") {
      return res.status(400).json({ error: "Username is required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const trimmedUsername = username.trim(); // Remove whitespace

    const existingUser = await User.findOne({ username: trimmedUsername });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${trimmedUsername}`
        : `https://avatar.iran.liara.run/public/girl?username=${trimmedUsername}`;

    const newUser = new User({
      fullName,
      username: trimmedUsername,
      password, // ⚠️ Storing password as plain text (not secure)
      gender,
      profilePic,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  res.send("Login User");
  console.log("LoginUser");
};

export const logout = (req, res) => {
  res.send("Logout User");
  console.log("LogoutUser");
};
