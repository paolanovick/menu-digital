const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updatePassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");

// Rutas públicas
router.post("/register", register);
router.post("/login", login);

// Rutas privadas (requieren autenticación)
router.get("/me", protect, getMe);
router.put("/password", protect, updatePassword);

module.exports = router;
