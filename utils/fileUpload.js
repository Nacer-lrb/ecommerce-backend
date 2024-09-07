const multer = require("multer");

// Configuration du stockage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Spécifie le dossier de destination des fichiers téléchargés
    },
    filename: function (req, file, cb) {
        // Génère un nom de fichier unique en utilisant la date actuelle
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    }
});

// Filtrage des types de fichiers autorisés
function fileFilter (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        cb(null, true); // Autorise les fichiers JPEG et PNG
    } else {
        cb(null, false); // Refuse tout autre type de fichier
    }
}

// Configuration de multer avec le stockage et le filtre de fichier
const upload = multer({ storage, fileFilter });

module.exports = { upload };
