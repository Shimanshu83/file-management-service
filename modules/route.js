const express = require('express')
const router = express.Router()
const fileManagementRoute = require('../modules/file-management/file-management.route');


router.use('/file-management' , fileManagementRoute);
module.exports = router;