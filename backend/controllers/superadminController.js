const Restaurante = require("../models/Restaurante");
const Usuario = require("../models/Usuario");
const Plato = require("../models/Plato");
const Categoria = require("../models/Categoria");

// Dashboard stats globales
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalRestaurantes, totalUsuarios, totalPlatos, totalCategorias] =
      await Promise.all([
        Restaurante.countDocuments(),
        Usuario.countDocuments(),
        Plato.countDocuments(),
        Categoria.countDocuments(),
      ]);

    const restaurantesActivos = await Restaurante.countDocuments({
      activo: true,
    });
    const restaurantesInactivos = await Restaurante.countDocuments({
      activo: false,
    });

    res.json({
      success: true,
      data: {
        totalRestaurantes,
        totalUsuarios,
        totalPlatos,
        totalCategorias,
        restaurantesActivos,
        restaurantesInactivos,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Obtener todos los restaurantes
exports.getAllRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurante.find().sort({ createdAt: -1 });

    // Contar platos y usuarios por restaurante
    const restaurantesConStats = await Promise.all(
      restaurantes.map(async (rest) => {
        const [platoCount, usuarioCount] = await Promise.all([
          Plato.countDocuments({ restauranteId: rest._id }),
          Usuario.countDocuments({ restauranteId: rest._id }),
        ]);

        return {
          ...rest.toObject(),
          platoCount,
          usuarioCount,
        };
      }),
    );

    res.json({
      success: true,
      data: restaurantesConStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Obtener un restaurante por ID (superadmin)
exports.getRestauranteById = async (req, res) => {
  try {
    const restaurante = await Restaurante.findById(req.params.id);

    if (!restaurante) {
      return res.status(404).json({
        success: false,
        message: 'Restaurante no encontrado'
      });
    }

    res.json({
      success: true,
      data: restaurante
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Crear restaurante (superadmin)
exports.crearRestaurante = async (req, res) => {
  try {
    const restaurante = await Restaurante.create(req.body);

    res.status(201).json({
      success: true,
      data: restaurante,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Actualizar restaurante (superadmin)
exports.actualizarRestaurante = async (req, res) => {
  try {
    const restaurante = await Restaurante.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!restaurante) {
      return res.status(404).json({
        success: false,
        message: "Restaurante no encontrado",
      });
    }

    res.json({
      success: true,
      data: restaurante,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Eliminar restaurante (superadmin)
exports.eliminarRestaurante = async (req, res) => {
  try {
    const restaurante = await Restaurante.findById(req.params.id);

    if (!restaurante) {
      return res.status(404).json({
        success: false,
        message: "Restaurante no encontrado",
      });
    }

    // Eliminar todos los datos asociados
    await Promise.all([
      Plato.deleteMany({ restauranteId: req.params.id }),
      Categoria.deleteMany({ restauranteId: req.params.id }),
      Usuario.deleteMany({ restauranteId: req.params.id }),
    ]);

    await restaurante.deleteOne();

    res.json({
      success: true,
      message: "Restaurante y todos sus datos eliminados",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .populate("restauranteId", "nombre slug")
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: usuarios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Crear usuario admin (superadmin)
exports.crearUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);

    res.status(201).json({
      success: true,
      data: usuario,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ... (después de crearUsuario)

// Actualizar usuario (superadmin)
exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email, restauranteId, rol, activo, password } = req.body;

    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Actualizar campos
    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (restauranteId !== undefined) usuario.restauranteId = restauranteId || null;
    if (rol) usuario.rol = rol;
    if (activo !== undefined) usuario.activo = activo;
    if (password) usuario.password = password; // Se hashea automáticamente

    await usuario.save();

    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Obtener un usuario por ID (superadmin)
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id)
      .populate('restauranteId', 'nombre slug')
      .select('-password');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    await usuario.deleteOne();

    res.json({
      success: true,
      message: "Usuario eliminado",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
