const jwt = require('jsonwebtoken');
const { error } = require('./Error');
const Usermodel = require('../models/User');

async function assignwebtoken(data, res) {
  if (!process.env.JT) {
    throw new Error('JWT secret (process.env.JT) is not defined');
  }
  const token = jwt.sign(data, process.env.JT, {
    expiresIn: "7d",
  });

  // Set cookie options based on environment
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isProduction, // Only true in production (HTTPS)
    sameSite: isProduction ? "None" : "Lax", // "None" for cross-site, "Lax" for local dev
  });
  return token;
}

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return error(res, 401, { message: "Authentication token missing" });

    if (!process.env.JT) {
      throw new Error('JWT secret (process.env.JT) is not defined');
    }
    const decode = jwt.verify(token, process.env.JT);
    if (!decode) return error(res, 401, { message: "Invalid token" });

    const { id } = decode;
    const user = await Usermodel.findById(id).select("-password");
    if (!user) return error(res, 401, { message: "User not found" });

    req.user = user;
    next();
  } catch (e) {
    console.error("Authentication error:", e.message);
    return error(res, 401, { message: "Authentication failed" });
  }
};

module.exports = { assignwebtoken, authenticate };