const express = require('express')
const Controller = require('../controller/fileController')
const router = express.Router()
const fileUpload = require("express-fileupload");
router.use(fileUpload());

module.exports = {
    show:router.get('/index',Controller.show),
    folder:router.get('/folder/builder',Controller.folder),
    upload:router.post('/upload/file',Controller.upload),
    files:router.get('/folder/files',Controller.files),
  
}