import jwt from "jsonwebtoken"
import User from "../models/User/UserSchema.js"

const verifyJwt = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization header is missing or improperly formatted" });
        }

        const token = authHeader.replace("Bearer ", "");

        // Verify the JWT
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Find the user based on the decoded token
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach the user to the request object for further use
        req.user = user;
        next();
    } catch (error){
        console.error("Error verifying JWT:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
export default verifyJwt;