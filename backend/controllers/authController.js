const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const Restaurante = require("../models/Restaurante");

// GENERAR JWT TOKEN
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token válido por 30 días
  });
};

// @desc    Registrar nuevo usuario (admin de restaurante)
// @route   POST /api/auth/register
// @access  Público (temporal, luego solo superadmin)
exports.register = async (req, res, next) => {
  try {
    const { nombre, email, password, restauranteNombre, telefono } = req.body;

    // Validar campos requeridos
    if (!nombre || !email || !password || !restauranteNombre) {
      return res.status(400).json({
        success: false,
        message: "Por favor completa todos los campos obligatorios",
      });
    }

    // Verificar si el email ya existe
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({
        success: false,
        message: "Este email ya está registrado",
      });
    }

    // Crear restaurante primero
    const restaurante = await Restaurante.create({
      nombre: restauranteNombre,
      // slug se genera automáticamente
    });

    // Crear usuario asociado al restaurante
    const usuario = await Usuario.create({
      nombre,
      email,
      password, // Se hashea automáticamente en el modelo
      telefono,
      restauranteId: restaurante._id,
      rol: "admin",
    });

    // Generar token
    const token = generarToken(usuario._id);

    res.status(201).json({
      success: true,
      message: "Usuario y restaurante creados exitosamente",
      data: {
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
        },
        restaurante: {
          id: restaurante._id,
          nombre: restaurante.nombre,
          slug: restaurante.slug,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Error en register:", error);
    return res.status(500).json({
      success: false,
      message: "Error al registrar usuario",
      error: error.message,
    });
  }
};

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  Público
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Por favor ingresa email y contraseña",
      });
    }

    // Buscar usuario (incluir password para comparar)
    const usuario = await Usuario.findOne({ email })
      .select("+password")
      .populate("restauranteId", "nombre slug logo");

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // Verificar contraseña
    const passwordCorrecto = await usuario.compararPassword(password);

    if (!passwordCorrecto) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // Verificar que el usuario esté activo
    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        message: "Usuario desactivado. Contacta al administrador",
      });
    }

    // Actualizar último acceso
    await usuario.actualizarUltimoAcceso();

    // Generar token
    const token = generarToken(usuario._id);

    res.status(200).json({
      success: true,
      message: "Login exitoso",
      data: {
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
        },
        restaurante: usuario.restauranteId,
        token,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};

// @desc    Obtener usuario actual (verificar token)
// @route   GET /api/auth/me
// @access  Privado
exports.getMe = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id)
      .select("-password")
      .populate("restauranteId", "nombre slug");

    res.json({
      success: true,
      data: usuario, // ← CAMBIAR AQUÍ: devolver solo el usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Actualizar contraseña
// @route   PUT /api/auth/password
// @access  Privado
exports.updatePassword = async (req, res, next) => {
  try {
    const { passwordActual, passwordNuevo } = req.body;

    if (!passwordActual || !passwordNuevo) {
      return res.status(400).json({
        success: false,
        message: "Por favor proporciona la contraseña actual y la nueva",
      });
    }

    // Obtener usuario con password
    const usuario = await Usuario.findById(req.usuario.id).select("+password");

    // Verificar contraseña actual
    const passwordCorrecto = await usuario.compararPassword(passwordActual);

    if (!passwordCorrecto) {
      return res.status(401).json({
        success: false,
        message: "Contraseña actual incorrecta",
      });
    }

    // Actualizar contraseña (se hashea automáticamente)
    usuario.password = passwordNuevo;
    await usuario.save();

    res.status(200).json({
      success: true,
      message: "Contraseña actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error en updatePassword:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar contraseña",
      error: error.message,
    });
  }
};
