const connectMongo = require('./mongodb')
const connectMySQL = require('./mysql')

// let initializer = process.env.DATABASE_TYPE === 'MONGODB' ? connectMongo : connectMySQL

const initializer = () => {
    if(process.env.DATABASE_TYPE === 'MONGODB'){
        return connectMongo()
    }else{
        return connectMySQL
    }    
}

module.exports = initializer