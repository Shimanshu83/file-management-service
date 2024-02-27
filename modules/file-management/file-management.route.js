const express = require('express');
const route = express.Router();
const fileManagementController = new (require('./file-management.controller'))();
const uploadService = new ( require('../../util/uploadService'))() ; 

route.post('/upload', uploadService.upload.array('filekey'),  fileManagementController.uploadFiles);
route.post('/delete' , fileManagementController.deleteFiles) ; 
route.get('/list' , fileManagementController.listFile) ; 
route.get('/file-category', fileManagementController.getFileCategory);
module.exports = route;