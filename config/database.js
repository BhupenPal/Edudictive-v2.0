const mongoose = require('mongoose')

const connectDB = () => {
    const connection = mongoose.connect("mongodb://localhost:27017/Edudictive", {
        useNewUrlParser: !0,
        useUnifiedTopology: !0,
        useCreateIndex: !0,
        useFindAndModify: !0
    })
}

module.exports = connectDB