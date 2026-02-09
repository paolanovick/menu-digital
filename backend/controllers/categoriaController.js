const Categoria = require("../models/Categoria");
const Plato = require("../models/Plato");

// @desc    Obtener todas las categorías de un restaurante (PÚBLICO)
// @route   GET /api/categorias?restauranteId=xxx
// @access  Público
exports.getCategorias = async (req, res) => {
  try {
    const { restauranteId } = req.query;

    if (!restauranteId) {
      return res.status(400).json({
        success: false,
        message: "Se requiere el ID del restaurante",
      });
    }

    const categorias = await Categoria.find({
      restauranteId,
      visible: true,
      activo: true,
    }).sort({ orden: 1 });

    // Agregar conteo de platos a cada categoría
    const categoriasConConteo = await Promise.all(
      categorias.map(async (categoria) => {
        const conteo = await categoria.contarPlatos();
        return {
          ...categoria.toObject(),
          totalPlatos: conteo,
        };
      }),
    );

    res.status(200).json({
      success: true,
      count: categoriasConConteo.length,
      data: categoriasConConteo,
    });
  } catch (error) {
    console.error("Error en getCategorias:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener categorías",
      error: error.message,
    });
  }
};

// @desc    Obtener todas MIS categorías (incluye ocultas)
// @route   GET /api/categorias/mis-categorias
// @access  Privado
exports.getMisCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find({
      restauranteId: req.usuario.restauranteId,
    }).sort({ orden: 1 });

    // Agregar conteo de platos
    const categoriasConConteo = await Promise.all(
      categorias.map(async (categoria) => {
        const conteo = await Plato.countDocuments({
          categoriaId: categoria._id,
        });
        return {
          ...categoria.toObject(),
          totalPlatos: conteo,
        };
      }),
    );

    res.status(200).json({
      success: true,
      count: categoriasConConteo.length,
      data: categoriasConConteo,
    });
  } catch (error) {
    console.error("Error en getMisCategorias:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener categorías",
      error: error.message,
    });
  }
};

// @desc    Obtener una categoría por ID
// @route   GET /api/categorias/:id
// @access  Privado
exports.getCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      });
    }

    // Verificar que pertenece al restaurante del usuario
    if (
      categoria.restauranteId.toString() !==
      req.usuario.restauranteId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para ver esta categoría",
      });
    }

    res.status(200).json({
      success: true,
      data: categoria,
    });
  } catch (error) {
    console.error("Error en getCategoria:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener categoría",
      error: error.message,
    });
  }
};

// @desc    Crear nueva categoría
// @route   POST /api/categorias
// @access  Privado
exports.createCategoria = async (req, res) => {
  try {
    // Agregar el restauranteId del usuario logueado
    req.body.restauranteId = req.usuario.restauranteId;

    // Si no se especifica orden, ponerlo al final
    if (!req.body.orden) {
      const ultimaCategoria = await Categoria.findOne({
        restauranteId: req.usuario.restauranteId,
      }).sort({ orden: -1 });

      req.body.orden = ultimaCategoria ? ultimaCategoria.orden + 1 : 0;
    }

    const categoria = await Categoria.create(req.body);

    res.status(201).json({
      success: true,
      message: "Categoría creada exitosamente",
      data: categoria,
    });
  } catch (error) {
    console.error("Error en createCategoria:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear categoría",
      error: error.message,
    });
  }
};

// @desc    Actualizar categoría
// @route   PUT /api/categorias/:id
// @access  Privado
exports.updateCategoria = async (req, res) => {
  try {
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      });
    }

    // Verificar permisos
    if (
      categoria.restauranteId.toString() !==
      req.usuario.restauranteId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para actualizar esta categoría",
      });
    }

    categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Categoría actualizada exitosamente",
      data: categoria,
    });
  } catch (error) {
    console.error("Error en updateCategoria:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar categoría",
      error: error.message,
    });
  }
};

// @desc    Eliminar categoría
// @route   DELETE /api/categorias/:id
// @access  Privado
exports.deleteCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      });
    }

    // Verificar permisos
    if (
      categoria.restauranteId.toString() !==
      req.usuario.restauranteId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para eliminar esta categoría",
      });
    }

    // Verificar si tiene platos asociados
    const platoCount = await Plato.countDocuments({
      categoriaId: categoria._id,
    });

    if (platoCount > 0) {
      return res.status(400).json({
        success: false,
        message: `No puedes eliminar esta categoría porque tiene ${platoCount} platos asociados. Primero elimina o reasigna los platos.`,
      });
    }

    await categoria.deleteOne();

    res.status(200).json({
      success: true,
      message: "Categoría eliminada exitosamente",
      data: {},
    });
  } catch (error) {
    console.error("Error en deleteCategoria:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar categoría",
      error: error.message,
    });
  }
};

// @desc    Reordenar categorías
// @route   PUT /api/categorias/reordenar
// @access  Privado
exports.reordenarCategorias = async (req, res) => {
  try {
    const { categorias } = req.body; // Array de { id, orden }

    if (!categorias || !Array.isArray(categorias)) {
      return res.status(400).json({
        success: false,
        message: "Se requiere un array de categorías con su nuevo orden",
      });
    }

    // Actualizar el orden de cada categoría
    const promises = categorias.map(({ id, orden }) =>
      Categoria.findOneAndUpdate(
        {
          _id: id,
          restauranteId: req.usuario.restauranteId, // Verificar permisos
        },
        { orden },
        { new: true },
      ),
    );

    await Promise.all(promises);

    res.status(200).json({
      success: true,
      message: "Categorías reordenadas exitosamente",
    });
  } catch (error) {
    console.error("Error en reordenarCategorias:", error);
    res.status(500).json({
      success: false,
      message: "Error al reordenar categorías",
      error: error.message,
    });
  }
};
