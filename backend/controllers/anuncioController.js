const Anuncio = require("../models/Anuncio");

// Obtener anuncios públicos (para frontend)
exports.getAnunciosPublicos = async (req, res) => {
  try {
    const { restauranteId, categoriaId } = req.query;

    // Obtener anuncios globales + anuncios de esta categoría (si existe)
    const filtro = {
      restauranteId,
      activo: true,
      $or: [
        { categoriaId: null }, // Globales
        ...(categoriaId ? [{ categoriaId }] : []), // De la categoría
      ],
    };

    const anuncios = await Anuncio.find(filtro).sort({ orden: 1 });

    res.json({
      success: true,
      data: anuncios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Obtener mis anuncios (admin)
exports.getMisAnuncios = async (req, res) => {
  try {
    const anuncios = await Anuncio.find({
      restauranteId: req.usuario.restauranteId,
    })
      .populate("categoriaId", "nombre")
      .sort({ orden: 1 });

    res.json({
      success: true,
      data: anuncios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Crear anuncio
exports.crearAnuncio = async (req, res) => {
  try {
    const anuncio = await Anuncio.create({
      ...req.body,
      restauranteId: req.usuario.restauranteId,
    });

    res.status(201).json({
      success: true,
      data: anuncio,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Actualizar anuncio
exports.actualizarAnuncio = async (req, res) => {
  try {
    const anuncio = await Anuncio.findOneAndUpdate(
      {
        _id: req.params.id,
        restauranteId: req.usuario.restauranteId,
      },
      req.body,
      { new: true, runValidators: true },
    );

    if (!anuncio) {
      return res.status(404).json({
        success: false,
        message: "Anuncio no encontrado",
      });
    }

    res.json({
      success: true,
      data: anuncio,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Toggle activo
exports.toggleActivo = async (req, res) => {
  try {
    const anuncio = await Anuncio.findOne({
      _id: req.params.id,
      restauranteId: req.usuario.restauranteId,
    });

    if (!anuncio) {
      return res.status(404).json({
        success: false,
        message: "Anuncio no encontrado",
      });
    }

    anuncio.activo = !anuncio.activo;
    await anuncio.save();

    res.json({
      success: true,
      data: anuncio,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Eliminar anuncio
exports.eliminarAnuncio = async (req, res) => {
  try {
    const anuncio = await Anuncio.findOneAndDelete({
      _id: req.params.id,
      restauranteId: req.usuario.restauranteId,
    });

    if (!anuncio) {
      return res.status(404).json({
        success: false,
        message: "Anuncio no encontrado",
      });
    }

    res.json({
      success: true,
      message: "Anuncio eliminado",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
