const multer = require('multer')

//set Storage

var storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'))
        cb(null, file.fieldname + '-' + Date.now() + ext)

    }
})


module.exports = store = multer({ storage: storage })