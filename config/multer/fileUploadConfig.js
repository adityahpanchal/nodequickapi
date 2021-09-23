const fileUploadConfig = {
    addProfile: {
        fieldsData: [{ name: 'profile', maxCount: 10, required: true, minCount: 2}, { name: 'avatar', maxCount: 10, required: true, minCount: 2}, { name: 'avatar2', maxCount: 10, required: false}],
        fileExtValidator: {
            profile: ['image/jpeg', 'image/jpg'],
            avatar: ['image/png'],
            avatar2: ['image/jpg', 'image/jpeg']
        },
        savingDestination: {
            profile: 'profile',
            avatar: 'avatar',
            avatar2: 'avatar2'
        }
    },
    addLogo: {
        field: {name: 'logo', maxCount: 10, required: true, minCount: 2},
        fileExtValidator:  ['image/png'],
        savingDestination: 'logo'
    },
    addBanner: {
        name: 'banner',
        fileExtValidator: ['image/jpeg', 'image/jpg'],
        savingDestination: 'banner',
        required: true
    }
}

module.exports = fileUploadConfig