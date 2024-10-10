import zod from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Make sure this is imported
import User from "../models/User/UserSchema.js";

// Parsers
const emailParser  = zod.string().email();
const passwordParser = zod.string().min(6);
const nameParser = zod.string();
const phoneNoParser = zod.string().min(10).max(14);
const usernameParser = zod.string();

const registerUser = async (req, res) => {
  try {
    const { email, password, name, phoneNo, userName } = req.body;

    // Zod validation
    const isEmail = emailParser.safeParse(email);
    const isPassword = passwordParser.safeParse(password);
    const isFullName = nameParser.safeParse(name);
    const isPhoneNo = phoneNoParser.safeParse(phoneNo);
    const isUsername = usernameParser.safeParse(userName);

    if (!isEmail.success) {
      return res.status(400).json({ errors: [{ msg: "Invalid email" }] });
    }
    if (!isPassword.success) {
      return res.status(400).json({ errors: [{ msg: "Password must be at least 6 characters long" }] });
    }
    if (!isFullName.success) {
      return res.status(400).json({ errors: [{ msg: "Full name is required" }] });
    }
    if (!isPhoneNo.success) {
      return res.status(400).json({ errors: [{ msg: "Invalid phone number format" }] });
    }
    if (!isUsername.success) {
      return res.status(400).json({ errors: [{ msg: "Username is required" }] });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      phoneNo,
      userName,
    });

    await newUser.save();
    return res.status(201).json({ msg: "User registered successfully" });
    
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Zod validation
    const isEmail = emailParser.safeParse(email);
    const isPassword = passwordParser.safeParse(password);

    if (!isEmail.success || !isPassword.success) {
      return res.status(400).json({ errors: [{ msg: "Invalid email or password type" }] });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, "securekarde", { expiresIn: "1d" });
    if (!token) {
      return res.status(500).json({ message: "Failed to generate token" });
    }

    // Save token to user document
    user.AccessToken = token;
    await user.save();

    // Return success response
    return res.status(200).json({
      message: "Login successful",
      user,
      token
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

export { loginUser, registerUser };