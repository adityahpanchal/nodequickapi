let mongoose = require("mongoose")

let connectionData = {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    username: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    dbname: process.env.MONGODB_DATABASE_NAME
}

let { host, port, username, password, dbname } = connectionData

let urlWithCreds = `mongodb://${username}:${password}@${host}:${port}/${dbname}`
let urlWithoutCreds = `mongodb://${host}:${port}/${dbname}`

let connectionURL = process.env.HAS_MONGODB_CREDS === 'TRUE' ? urlWithCreds : urlWithoutCreds

const connectMongo = async() => {
    try{
        await mongoose.connect(connectionURL)
        console.log(`MongoDB Database connected successfully`)
    }catch(error) {
        console.error(`Error in MongoDB database connection`, error)
    }
}

module.exports = connectMongo