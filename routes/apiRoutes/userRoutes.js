const router = require('express').Router()
const { fileUploader, fileUploadConfig, profileModel } = require('../../config/multer/index')

router.post('/addProfile', fileUploader(profileModel), (req, res) => {
    return res.json({
        data: req.files
    })
})

router.post('/addLogo', fileUploader(fileUploadConfig.addLogo), (req, res) => {
    return res.json({
        data: req.files
    })
})

router.post('/addBanner', fileUploader(fileUploadConfig.addBanner), (req, res) => {
    return res.json({
        data: req.file
    })
})

module.exports = router