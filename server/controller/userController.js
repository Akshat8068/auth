import User from "../model/userSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Plz fill all details" })
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        return res.status(400).json({ msg: "User Already exist" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({ name, email, password: hashedPassword })
    if (!user) {
        return res.status(400).json({ msg: "User Not Created" })
    }
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ msg: "Plz fill all details" })
    }
    const user = await User.findOne({ email })
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).json({ msg: "Invalid Credentials" })
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' })
}

export { registerUser, loginUser }
