const Restaurante = require("../models/Restaurante");

// @desc    Obtener restaurante por slug (PÚBLICO)
// @route   GET /api/restaurantes/:slug
// @access  Público
exports.getRestauranteBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const restaurante = await Restaurante.findOne({ slug, activo: true });

    if (!restaurante) {
      return res.status(404).json({
        success: false,
        message: "Restaurante no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: restaurante,
    });
  } catch (error) {
    console.error("Error en getRestauranteBySlug:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener restaurante",
      error: error.message,
    });
  }
};

// @desc    Obtener MI restaurante (del usuario logueado)
// @route   GET /api/restaurantes/mi-restaurante
// @access  Privado
exports.getMiRestaurante = async (req, res) => {
  try {
    const restaurante = await Restaurante.findById(req.usuario.restauranteId);

    if (!restaurante) {
      return res.status(404).json({
        success: false,
        message: "Restaurante no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: restaurante,
    });
  } catch (error) {
    console.error("Error en getMiRestaurante:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener restaurante",
      error: error.message,
    });
  }
};

// @desc    Actualizar información del restaurante
// @route   PUT /api/restaurantes/:id
// @access  Privado
exports.updateRestaurante = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el usuario sea dueño del restaurante
    if (req.usuario.restauranteId.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para actualizar este restaurante",
      });
    }

    const restaurante = await Restaurante.findByIdAndUpdate(id, req.body, {
      new: true, // Devolver el documento actualizado
      runValidators: true, // Ejecutar validaciones del schema
    });

    if (!restaurante) {
      return res.status(404).json({
        success: false,
        message: "Restaurante no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Restaurante actualizado exitosamente",
      data: restaurante,
    });
  } catch (error) {
    console.error("Error en updateRestaurante:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar restaurante",
      error: error.message,
    });
  }
};

// @desc    Actualizar tema/colores del restaurante
// @route   PUT /api/restaurantes/:id/tema
// @access  Privado
exports.updateTema = async (req, res) => {
  try {
    const { id } = req.params;
    const { colorPrimario, colorSecundario, colorFondo, colorTexto } = req.body;

    // Verificar que el usuario sea dueño del restaurante
    if (req.usuario.restauranteId.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para actualizar este restaurante",
      });
    }

    const restaurante = await Restaurante.findByIdAndUpdate(
      id,
      {
        "tema.colorPrimario": colorPrimario,
        "tema.colorSecundario": colorSecundario,
        "tema.colorFondo": colorFondo,
        "tema.colorTexto": colorTexto,
      },
      { new: true, runValidators: true },
    );

    if (!restaurante) {
      return res.status(404).json({
        success: false,
        message: "Restaurante no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tema actualizado exitosamente",
      data: {
        tema: restaurante.tema,
      },
    });
  } catch (error) {
    console.error("Error en updateTema:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar tema",
      error: error.message,
    });
  }
};

// @desc    Actualizar horarios del restaurante
// @route   PUT /api/restaurantes/:id/horarios
// @access  Privado
exports.updateHorarios = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el usuario sea dueño del restaurante
    if (req.usuario.restauranteId.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para actualizar este restaurante",
      });
    }

    const restaurante = await Restaurante.findByIdAndUpdate(
      id,
      { horarios: req.body },
      { new: true, runValidators: true },
    );

    if (!restaurante) {
      return res.status(404).json({
        success: false,
        message: "Restaurante no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Horarios actualizados exitosamente",
      data: {
        horarios: restaurante.horarios,
      },
    });
  } catch (error) {
    console.error("Error en updateHorarios:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar horarios",
      error: error.message,
    });
  }
};

// @desc    Actualizar contacto del restaurante
// @route   PUT /api/restaurantes/:id/contacto
// @access  Privado
exports.updateContacto = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el usuario sea dueño del restaurante
    if (req.usuario.restauranteId.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para actualizar este restaurante",
      });
    }

    const restaurante = await Restaurante.findByIdAndUpdate(
      id,
      { contacto: req.body },
      { new: true, runValidators: true },
    );

    if (!restaurante) {
      return res.status(404).json({
        success: false,
        message: "Restaurante no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Información de contacto actualizada exitosamente",
      data: {
        contacto: restaurante.contacto,
      },
    });
  } catch (error) {
    console.error("Error en updateContacto:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar contacto",
      error: error.message,
    });
  }
};
// Actualizar configuración de delivery y ticker
exports.updateDeliveryConfig = async (req, res) => {
  try {
    const { deliveryActivo, tickerActivo } = req.body;

    const restaurante = await Restaurante.findById(req.params.id);

    if (!restaurante) {
      return res.status(404).json({
        success: false,
        message: 'Restaurante no encontrado'
      });
    }

    if (deliveryActivo !== undefined) restaurante.deliveryActivo = deliveryActivo;
    if (tickerActivo !== undefined) restaurante.tickerActivo = tickerActivo;

    await restaurante.save();

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