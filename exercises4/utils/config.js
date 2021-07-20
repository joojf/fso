require('dotenv').config()

let PORT = 3003
let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    PORT,
    MONGODB_URI,
}
