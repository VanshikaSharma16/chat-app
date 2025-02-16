import User from "../models/userModel";

export const signup = async (req, res) => {
    try {
        const {fullname, username, password, confirmpassword, gender} = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({message: "Password didn't match"})
        }
        const user = await User.findOne({username});
        if (user) {
            return res.status(400).json({error: "Username already exists"})
        }

        // HASH PASSWORD HERE
        // const hashedPassword = await bcrypt.hash(password, 12);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic: girlProfilePic
        })
        await newUser.save();
        res.status(201).json({message: "User created successfully"})
    } catch (error){
        console.log("Error in signUp controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
};

export const login = (req, res) => {
    res.send("Login User")
    console.log('LoginUser');
};

export const logout = (req, res) => {
    res.send("Logout User")
    console.log('LogoutUser');
};