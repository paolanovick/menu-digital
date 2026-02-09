const multer = require("multer");
const path = require("path");

// Configuración de multer para archivos Excel/CSV
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta temporal
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "menu-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Filtro: solo Excel y CSV
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos Excel (.xlsx, .xls) o CSV"), false);
  }
};

const uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
  },
});

module.exports = uploadFile;
