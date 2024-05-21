import User from "../models/User.js";

const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    const user = new User({ fullName, email, password });
    try {
        await user.save();
        res.status(201).send("User registered.");
    } catch (error) {
        res.status(400).send("Error registering user.");
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("User not found.");

        if (user.password !== password) return res.status(400).send("Invalid password.");

        res.status(200).send("Login successful.");
    } catch (error) {
        res.status(500).send("Server error.");
    }
};

export {
    register,
    login
};