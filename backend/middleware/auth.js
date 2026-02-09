const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

// Middleware existente
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No autorizado - Sin token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decoded.id).select("-password");

    if (!req.usuario) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "No autorizado - Token inválido",
    });
  }
};

// ⭐ NUEVO: Middleware para Superadmin
exports.superadminOnly = async (req, res, next) => {
  if (req.usuario.rol !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Acceso denegado - Solo superadmin",
    });
  }
  next();
};
