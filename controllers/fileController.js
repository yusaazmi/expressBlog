const multer = require('multer');
const { File } = require("../models");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/images/'); // Specify the directory to save files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Define the file name
    }
});

// Initialize multer upload
const upload = multer({ storage: storage });

class FileController {
    // Handle file upload middleware
    uploadFile(req, res, next) {
        upload.single('image')(req, res, function (err) {
            if (err) {
                return res.status(400).json({ message: 'Error uploading file' });
            }
            next();
        });
    }

    // Handle file upload logic
    async uploadFileHandler(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            const file = await File.create({
                filename: req.file.originalname,
                type: req.file.mimetype,
                url: `http://localhost:3000/src/uploads/images/${req.file.filename}`,
                path: `src/uploads/images/${req.file.filename}`
            });
            // File uploaded successfully
            res.json({
                code: 201,
                message: 'File uploaded successfully',
                data: file
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new FileController();
