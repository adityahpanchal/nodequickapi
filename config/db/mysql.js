let mysql = require('mysql')

let connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE_NAME
})

process.env.DATABASE_TYPE === 'MYSQL' &&
connection.connect((err) => {
    if(err) {
        console.error(`Error in MySQL database connection`, err)
        return
    }

    console.log('MySQL Database connected successfully')
})

module.exports = connection