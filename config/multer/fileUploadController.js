const multer = require('multer')
const path = require('path')
const fs = require('fs')

const removeFileIfFailed = (paths) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < paths.length; i++) {
            fs.unlinkSync(paths[i])
        }

        resolve(true)
    })
}

let pathToDelete = []

// for (const key in req.files) {
//     let pathsOfKey = req.files[key].map(obj => obj.path) 
//     pathToDelete = [...pathToDelete, ...pathsOfKey]
// }
// removeFileIfFailed(pathToDelete)

exports.multiFieldsUploader = (fieldsData, fileExtValidator, savingDestination, req, res, next) => {
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
  
        let uploadReport = []

        let pathsByField = {}

        let allPaths = []

        for (let i = 0; i < fieldsData.length; i++) {

            if(fieldsData[i].required){
                const minCount = fieldsData[i].minCount ? fieldsData[i].minCount : 1
                const fieldName = fieldsData[i].name
            
                let uploadedCount = req.files[fieldName] ? req.files[fieldName].length : 0
    
                if(minCount > uploadedCount) {
                    uploadReport.push({fieldName: fieldName, uploadedCount: uploadedCount, minCount: minCount, required: true, success: false})
                }else{
                    uploadReport.push({fieldName: fieldName, uploadedCount: uploadedCount, minCount: minCount, required: true, success: true})
                }
            }else{
                const minCount = fieldsData[i].minCount ? fieldsData[i].minCount : 1
                const fieldName = fieldsData[i].name
            
                let uploadedCount = req.files[fieldName] ? req.files[fieldName].length : 0
    
                if(minCount > uploadedCount) {
                    uploadReport.push({fieldName: fieldName, uploadedCount: uploadedCount, minCount: minCount, required: false, success: false})
                }else{
                    uploadReport.push({fieldName: fieldName, uploadedCount: uploadedCount, minCount: minCount, required: false, success: true})
                }
            } 
            
            const element = fieldsData[i].name;
            if(req.files[element]){

                let paths = []

                for (let i = 0; i < req.files[element].length; i++) {
                    const obj = req.files[element][i]
                    paths.push(obj.path)
                    allPaths.push(obj.path)
                }
                pathsByField[element] = paths
            }else{
                pathsByField[element] = []
            }
        }

        req.uploadReport = uploadReport
        req.pathsByField = pathsByField
        req.allPaths = allPaths
    
       next()
    })
}

exports.singleFieldMultiFIleUploader = (field, fileExtValidator, savingDestination, req, res, next) => {
    let removeTrash = []
        
    const diskStorage = multer.diskStorage({

        destination: (req, file, cb) =>{
            cb(null, path.join(__dirname, `../../public/uploads/${savingDestination}`))
        },
    
        filename: (req, file, cb) => {

            let extensionArr = file.originalname.split('.')
            let extension = extensionArr[extensionArr.length - 1]

            const uniqueSuffix = `${Date.now()}.${extension}` 
            cb(null, uniqueSuffix)
        }
    })

    const fileFilter = (req, file, cb) => {

        let validatorExtension = fileExtValidator

        if(validatorExtension.indexOf(file.mimetype) !== -1) {
            cb(null, true)
        }else{
            cb(null, false)

            if(removeTrash.indexOf(file.fieldname) === -1) {
                removeTrash.push(file.fieldname)
            }
        }
    
    }

    const upload = multer({fileFilter: fileFilter, storage: diskStorage}).array(field.name, field.maxCount)

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.json({ error: err})
        } else if (err) {
            return res.json({ error: err})
        }

        if(field.required) {

            let count = req.files.length

            if(field.minCount > count) {
                let pathToDelete = req.files.map(obj => obj.path)

                removeFileIfFailed(pathToDelete)
                
                return res.status(200).json({
                    message: 'some file was removed' 
                })
            }
        }
        next()
    })
}

exports.signleFileUpload = (name, fileExtValidator, savingDestination, required, req, res, next) => {
    let removeTrash = []
        
    const diskStorage = multer.diskStorage({

        destination: (req, file, cb) =>{
            cb(null, path.join(__dirname, `../../public/uploads/${savingDestination}`))
        },
    
        filename: (req, file, cb) => {

            let extensionArr = file.originalname.split('.')
            let extension = extensionArr[extensionArr.length - 1]

            const uniqueSuffix = `${Date.now()}.${extension}` 
            cb(null, uniqueSuffix)
        }
    })

    const fileFilter = (req, file, cb) => {

        let validatorExtension = fileExtValidator

        if(validatorExtension.indexOf(file.mimetype) !== -1) {
            cb(null, true)
        }else{
            cb(null, false)

            if(removeTrash.indexOf(file.fieldname) === -1) {
                removeTrash.push(file.fieldname)
            }
        }
    
    }

    const upload = multer({fileFilter: fileFilter, storage: diskStorage}).single(name)

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.json({ error: err})
        } else if (err) {
            return res.json({ error: err})
        }

        if(required && req.file === undefined) {
            return res.status(200).json({
                message: 'some file was removed' 
            })
        }
        next()
    })
}