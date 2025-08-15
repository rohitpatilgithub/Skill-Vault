import jwt from 'jsonwebtoken'

export const verifyUser = async (req,res,next) => {
    const JWT_SECRET = process.env.JWT;

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // why split(' ') [1]

    if(!token){
        return res.status(401).json({ msg : "Invalid token"});
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        req.user = decoded; // why req.user
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
}