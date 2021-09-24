const profileModal = {
    profile: {
        fileExtValidator: ['image/jpeg', 'image/jpg'],
        maxCount: 10,
        required: true, 
        minCount: 2,
        savingDestination: 'profile'
    },
    avatar: {
        fileExtValidator: ['image/png'],
        maxCount: 1,
        required: true, 
        minCount: 2,
        savingDestination: 'avatar'  
    },
    avatar2: {
        fileExtValidator: ['image/jpeg', 'image/jpg'],
        maxCount: 10,
        required: false, 
        minCount: 1,
        savingDestination: 'avatar2' 
    }
}

module.exports = profileModal
