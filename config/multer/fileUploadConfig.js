const fileUploadConfig = {
    addProfile: {
        fieldsData: [{ name: 'profile', maxCount: 10, required: false, minCount: 2}, { name: 'avatar', maxCount: 10, required: true, minCount: 2}],
        fileExtValidator: {
            profile: ['image/jpeg', 'image/jpg'],
            avatar: ['image/png']
        },
        savingDestination: {
            profile: 'profile',
            avatar: 'avatar'
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