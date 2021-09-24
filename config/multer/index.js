const fileUploader = require('../../config/multer/fileUploader')
const fileUploadConfig = require('../../config/multer/fileUploadConfig')
const profileModel = require('./models/profile')

module.exports = {
    fileUploader,
    fileUploadConfig,
    profileModel
}