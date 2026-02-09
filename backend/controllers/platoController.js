const Plato = require("../models/Plato");
const Categoria = require("../models/Categoria");

// @desc    Obtener todos los platos de un restaurante (PÚBLICO)
// @route   GET /api/platos?restauranteId=xxx&categoriaId=xxx
// @access  Público
exports.getPlatos = async (req, res) => {
  try {
    const { restauranteId, categoriaId, destacado } = req.query;

    if (!restauranteId) {
      return res.status(400).json({
        success: false,
        message: "Se requiere el ID del restaurante",
      });
    }

    // Construir query
    let query = {
      restauranteId,
      visible: true,
      disponible: true,
    };

    if (categoriaId) {
      query.categoriaId = categoriaId;
    }

    if (destacado === "true") {
      query.destacado = true;
    }

    const platos = await Plato.find(query)
      .populate("categoriaId", "nombre icono color")
      .sort({ orden: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: platos.length,
      data: platos,
    });
  } catch (error) {
    console.error("Error en getPlatos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener platos",
      error: error.message,
    });
  }
};

// @desc    Obtener todos MIS platos (incluye ocultos/no disponibles)
// @route   GET /api/platos/mis-platos
// @access  Privado
exports.getMisPlatos = async (req, res) => {
  try {
    const { categoriaId } = req.query;

    let query = {
      restauranteId: req.usuario.restauranteId,
    };

    if (categoriaId) {
      query.categoriaId = categoriaId;
    }

    const platos = await Plato.find(query)
      .populate("categoriaId", "nombre icono color")
      .sort({ categoriaId: 1, orden: 1 });

    res.status(200).json({
      success: true,
      count: platos.length,
      data: platos,
    });
  } catch (error) {
    console.error("Error en getMisPlatos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener platos",
      error: error.message,
    });
  }
};

// @desc    Obtener platos destacados
// @route   GET /api/platos/destacados?restauranteId=xxx
// @access  Público
exports.getPlatosDestacados = async (req, res) => {
  try {
    const { restauranteId } = req.query;

    if (!restauranteId) {
      return res.status(400).json({
        success: false,
        message: "Se requiere el ID del restaurante",
      });
    }

    const platos = await Plato.obtenerDestacados(restauranteId);

    res.status(200).json({
      success: true,
      count: platos.length,
      data: platos,
    });
  } catch (error) {
    console.error("Error en getPlatosDestacados:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener platos destacados",
      error: error.message,
    });
  }
};

// @desc    Obtener un plato por ID
// @route   GET /api/platos/:id
// @access  Público
exports.getPlato = async (req, res) => {
  try {
    const plato = await Plato.findById(req.params.id)
      .populate("categoriaId", "nombre icono")
      .populate("restauranteId", "nombre logo tema");

    if (!plato) {
      return res.status(404).json({
        success: false,
        message: "Plato no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: plato,
    });
  } catch (error) {
    console.error("Error en getPlato:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener plato",
      error: error.message,
    });
  }
};

// @desc    Crear nuevo plato
// @route   POST /api/platos
// @access  Privado
exports.createPlato = async (req, res) => {
  try {
    // Agregar el restauranteId del usuario logueado
    req.body.restauranteId = req.usuario.restauranteId;

    // Verificar que la categoría existe y pertenece al restaurante
    const categoria = await Categoria.findOne({
      _id: req.body.categoriaId,
      restauranteId: req.usuario.restauranteId,
    });

    if (!categoria) {
      return res.status(400).json({
        success: false,
        message: "Categoría no válida o no pertenece a tu restaurante",
      });
    }

    // Si no se especifica orden, ponerlo al final de la categoría
    if (!req.body.orden) {
      const ultimoPlato = await Plato.findOne({
        categoriaId: req.body.categoriaId,
      }).sort({ orden: -1 });

      req.body.orden = ultimoPlato ? ultimoPlato.orden + 1 : 0;
    }

    const plato = await Plato.create(req.body);

    // Popularlo antes de devolver
    await plato.populate("categoriaId", "nombre icono");

    res.status(201).json({
      success: true,
      message: "Plato creado exitosamente",
      data: plato,
    });
  } catch (error) {
    console.error("Error en createPlato:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear plato",
      error: error.message,
    });
  }
};

// @desc    Actualizar plato
// @route   PUT /api/platos/:id
// @access  Privado
exports.updatePlato = async (req, res) => {
  try {
    let plato = await Plato.findById(req.params.id);

    if (!plato) {
      return res.status(404).json({
        success: false,
        message: "Plato no encontrado",
      });
    }

    // Verificar permisos
    if (
      plato.restauranteId.toString() !== req.usuario.restauranteId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para actualizar este plato",
      });
    }

    // Si se cambia la categoría, verificar que existe
    if (
      req.body.categoriaId &&
      req.body.categoriaId !== plato.categoriaId.toString()
    ) {
      const categoria = await Categoria.findOne({
        _id: req.body.categoriaId,
        restauranteId: req.usuario.restauranteId,
      });

      if (!categoria) {
        return res.status(400).json({
          success: false,
          message: "Categoría no válida",
        });
      }
    }

    plato = await Plato.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("categoriaId", "nombre icono");

    res.status(200).json({
      success: true,
      message: "Plato actualizado exitosamente",
      data: plato,
    });
  } catch (error) {
    console.error("Error en updatePlato:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar plato",
      error: error.message,
    });
  }
};

// @desc    Eliminar plato
// @route   DELETE /api/platos/:id
// @access  Privado
exports.deletePlato = async (req, res) => {
  try {
    const plato = await Plato.findById(req.params.id);

    if (!plato) {
      return res.status(404).json({
        success: false,
        message: "Plato no encontrado",
      });
    }

    // Verificar permisos
    if (
      plato.restauranteId.toString() !== req.usuario.restauranteId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para eliminar este plato",
      });
    }

    await plato.deleteOne();

    res.status(200).json({
      success: true,
      message: "Plato eliminado exitosamente",
      data: {},
    });
  } catch (error) {
    console.error("Error en deletePlato:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar plato",
      error: error.message,
    });
  }
};

// @desc    Cambiar disponibilidad de un plato (agotado/disponible)
// @route   PUT /api/platos/:id/disponibilidad
// @access  Privado
exports.toggleDisponibilidad = async (req, res) => {
  try {
    const plato = await Plato.findById(req.params.id);

    if (!plato) {
      return res.status(404).json({
        success: false,
        message: "Plato no encontrado",
      });
    }

    // Verificar permisos
    if (
      plato.restauranteId.toString() !== req.usuario.restauranteId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso",
      });
    }

    plato.disponible = !plato.disponible;
    await plato.save();

    res.status(200).json({
      success: true,
      message: `Plato marcado como ${plato.disponible ? "disponible" : "agotado"}`,
      data: {
        id: plato._id,
        disponible: plato.disponible,
      },
    });
  } catch (error) {
    console.error("Error en toggleDisponibilidad:", error);
    res.status(500).json({
      success: false,
      message: "Error al cambiar disponibilidad",
      error: error.message,
    });
  }
};

// @desc    Cambiar destacado de un plato
// @route   PUT /api/platos/:id/destacado
// @access  Privado
exports.toggleDestacado = async (req, res) => {
  try {
    const plato = await Plato.findById(req.params.id);

    if (!plato) {
      return res.status(404).json({
        success: false,
        message: "Plato no encontrado",
      });
    }

    // Verificar permisos
    if (
      plato.restauranteId.toString() !== req.usuario.restauranteId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso",
      });
    }

    plato.destacado = !plato.destacado;
    await plato.save();

    res.status(200).json({
      success: true,
      message: `Plato ${plato.destacado ? "destacado" : "normal"}`,
      data: {
        id: plato._id,
        destacado: plato.destacado,
      },
    });
  } catch (error) {
    console.error("Error en toggleDestacado:", error);
    res.status(500).json({
      success: false,
      message: "Error al cambiar destacado",
      error: error.message,
    });
  }
};
