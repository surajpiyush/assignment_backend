const jwt = require("jsonwebtoken");
module.exports.authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Token is required" });
	}

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Invalid token" });
		}
		req.userId = decoded.userId;
        console.log('this is id',decoded.userId)
		next();
	});
};
