const fs = require('fs')

let deleted = fs.unlinkSync('C:\\Users\\Aditya Panchal\\Desktop\\quickapi\\public\\uploads\\profile\\1632239505188.jpg')
console.log(deleted)


////////////////////////////////
const multer = require('multer')
const path = require('path')


const fileUploader = ({fieldsData, fileExtValidator, savingDestination, shouldReset, shouldResetAll}) => {

    return (req, res, next) => {

        let removeTrash = []
        
        const diskStorage = multer.diskStorage({

            destination: (req, file, cb) =>{
                cb(null, path.join(__dirname, `../../public/uploads/${savingDestination[file.fieldname]}`))
            },
        
            filename: (req, file, cb) => {

                let extensionArr = file.originalname.split('.')
                let extension = extensionArr[extensionArr.length - 1]

                const uniqueSuffix = `${Date.now()}.${extension}` 
                cb(null, uniqueSuffix)
            }
        })
    
        const fileFilter = (req, file, cb) => {

            let validatorExtension = fileExtValidator[file.fieldname]

            if(validatorExtension.indexOf(file.mimetype) !== -1) {
                cb(null, true)
            }else{
                cb(null, false)

                if(removeTrash.indexOf(file.fieldname) === -1) {
                    removeTrash.push(file.fieldname)
                }
            }
        
        }

        const upload = multer({fileFilter: fileFilter, storage: diskStorage}).fields(fieldsData)
    
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.json({ error: err})
            } else if (err) {
                return res.json({ error: err})
            }

            console.log(removeTrash)
            console.log(req.files)

            let requiredFields = fieldsData.filter(field => field.required)
           
            if(requiredFields.length > 0) {
                let failedFields = []

                for (let i = 0; i < requiredFields.length; i++) {
                    const fieldName = requiredFields[i].name
                    const minCount = requiredFields[i].minCount
                    
                    let uploadedCount = req.files[fieldName].length

                    if(minCount > uploadedCount) {
                        failedFields.push({fieldName: fieldName, count: uploadedCount})
                    }
                }

                console.log(failedFields)

                if(failedFields.length > 0) {
                    let pathToDelete = []

                    for (const key in req.files) {
                        let pathsOfKey = req.files[key].map(obj => obj.path) 
                        pathToDelete = [...pathToDelete, ...pathsOfKey]
                    }
                    console.log(pathToDelete)
                }
            }
            next()
        })
    }
}

module.exports = fileUploader
////////////////////////////////

const router = require('express').Router()
const fileUploader = require('../../config/multer/fileUploader')

const fileUploadParams = {
    addProfile: {
        fieldsData: [{ name: 'profile', maxCount: 10, required: true, minCount: 2}, { name: 'avatar', maxCount: 10, required: true, minCount: 2}],
        fileExtValidator: {
            profile: ['image/jpeg', 'image/jpg'],
            avatar: ['image/png']
        },
        savingDestination: {
            profile: 'profile',
            avatar: 'avatar'
        },
        cancelRequestIfAnyFailed: false,
        cancelRequestIfFailOf: ['profile']
    }
}

router.post('/addProfile', fileUploader(fileUploadParams.addProfile), (req, res) => {
    return res.json({
        data: req.files
    })
})

module.exports = router