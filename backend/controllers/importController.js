const XLSX = require("xlsx");
const fs = require("fs");
const Categoria = require("../models/Categoria");
const Plato = require("../models/Plato");

// @desc    Importar menú desde Excel/CSV
// @route   POST /api/import/menu
// @access  Privado
exports.importarMenu = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No se recibió ningún archivo",
      });
    }

    const restauranteId = req.usuario.restauranteId;
    const filePath = req.file.path;

    // Leer archivo Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convertir a JSON
    const data = XLSX.utils.sheet_to_json(worksheet);

    if (!data || data.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        success: false,
        message: "El archivo está vacío o no tiene el formato correcto",
      });
    }

    // Procesar datos
    const resultados = {
      categoriasCreadas: 0,
      platosCreados: 0,
      platosActualizados: 0,
      errores: [],
    };

    // Crear mapa de categorías
    const categoriasMap = new Map();

    for (let i = 0; i < data.length; i++) {
      const fila = data[i];

      try {
        // Validar campos requeridos
        if (!fila.categoria || !fila.nombre || !fila.precio) {
          resultados.errores.push({
            fila: i + 2,
            error: "Faltan campos obligatorios (categoria, nombre, precio)",
          });
          continue;
        }

        // Buscar o crear categoría
        let categoria = categoriasMap.get(fila.categoria);

        if (!categoria) {
          categoria = await Categoria.findOne({
            restauranteId,
            nombre: fila.categoria,
          });

          if (!categoria) {
            categoria = await Categoria.create({
              restauranteId,
              nombre: fila.categoria,
              descripcion: fila.descripcion_categoria || "",
              icono: fila.icono_categoria || "🍽️",
            });
            resultados.categoriasCreadas++;
          }

          categoriasMap.set(fila.categoria, categoria);
        }

        // Preparar datos del plato
        const platoData = {
          restauranteId,
          categoriaId: categoria._id,
          nombre: fila.nombre,
          descripcion: fila.descripcion || "",
          precio: parseFloat(fila.precio),
          ingredientes: fila.ingredientes
            ? fila.ingredientes.split(",").map((i) => i.trim())
            : [],
          alergenos: fila.alergenos
            ? fila.alergenos.split(",").map((a) => a.trim())
            : [],
          imagen: fila.imagen_url || "",
          etiquetas: {
            vegetariano:
              fila.vegetariano?.toLowerCase() === "si" ||
              fila.vegetariano === "1",
            vegano: fila.vegano?.toLowerCase() === "si" || fila.vegano === "1",
            sinGluten:
              fila.sin_gluten?.toLowerCase() === "si" ||
              fila.sin_gluten === "1",
            picante:
              fila.picante?.toLowerCase() === "si" || fila.picante === "1",
          },
          destacado:
            fila.destacado?.toLowerCase() === "si" || fila.destacado === "1",
          disponible: true,
          visible: true,
        };

        // Buscar si el plato ya existe (por nombre y categoría)
        const platoExistente = await Plato.findOne({
          restauranteId,
          categoriaId: categoria._id,
          nombre: fila.nombre,
        });

        if (platoExistente) {
          // Actualizar plato existente
          await Plato.findByIdAndUpdate(platoExistente._id, platoData);
          resultados.platosActualizados++;
        } else {
          // Crear plato nuevo
          await Plato.create(platoData);
          resultados.platosCreados++;
        }
      } catch (error) {
        resultados.errores.push({
          fila: i + 2,
          error: error.message,
        });
      }
    }

    // Eliminar archivo temporal
    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      message: "Importación completada",
      data: resultados,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error("Error en importarMenu:", error);
    res.status(500).json({
      success: false,
      message: "Error al importar menú",
      error: error.message,
    });
  }
};

// @desc    Descargar plantilla Excel de ejemplo
// @route   GET /api/import/plantilla
// @access  Privado
exports.descargarPlantilla = async (req, res) => {
  try {
    const datosEjemplo = [
      {
        categoria: "Entradas",
        nombre: "Empanadas de carne",
        descripcion: "Empanadas caseras",
        precio: 1200,
        ingredientes: "carne,cebolla,aceitunas",
        alergenos: "gluten",
        vegetariano: "no",
        vegano: "no",
        sin_gluten: "no",
        picante: "no",
        destacado: "si",
        imagen_url:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      },
      {
        categoria: "Postres",
        nombre: "Flan casero",
        descripcion: "Con dulce de leche",
        precio: 950,
        ingredientes: "leche,azucar",
        alergenos: "lacteos,huevo",
        vegetariano: "si",
        vegano: "no",
        sin_gluten: "si",
        picante: "no",
        destacado: "no",
        imagen_url:
          "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400",
      },
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(datosEjemplo);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Menu");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=plantilla-menu.xlsx",
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.send(buffer);
  } catch (error) {
    console.error("Error en descargarPlantilla:", error);
    res.status(500).json({
      success: false,
      message: "Error al generar plantilla",
      error: error.message,
    });
  }
};
