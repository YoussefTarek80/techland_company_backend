const adminModel = require("../models/adminsModel");
// adminModel.sync({ alter: true })
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await adminModel.create({ username, password: hashedPassword });
        res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await adminModel.findOne({ where: { username } });
        if (!admin) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { loginAdmin,addAdmin };