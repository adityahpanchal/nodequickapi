const { multiFieldsUploader, singleFieldMultiFIleUploader, signleFileUpload } = require('./fileUploadController')

const fileUploader = (params) => {

    return (req, res, next) => {

        if(params.fieldsData){
            multiFieldsUploader(params.fieldsData, params.fileExtValidator, params.savingDestination, req, res, next)
        }else if(params.field){
            singleFieldMultiFIleUploader(params.field, params.fileExtValidator, params.savingDestination, req, res, next)
        }else{
            signleFileUpload(params.name, params.fileExtValidator, params.savingDestination, params.required, req, res, next)
        }
    }
}

module.exports = fileUploader