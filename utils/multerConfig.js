const path = require("path");
const multer = require("multer");
// set up multer
// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + path.extname(file.originalname));
    }
});


// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('list');


// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /[a-z]+/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: invalid file!');
    }
}

module.exports = upload;