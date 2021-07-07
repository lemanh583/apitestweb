require("dotenv").config();
const express = require("express");
const app = express();
const route = require('./routers')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles : true,
    // tempFileDir : '/tmp/'
}));
app.use(cors())

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:root@dbnews.z990p.mongodb.net/dbnews?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(`MongooseDB connect`)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
} 

connectDB()



app.use(route)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server run on port${process.env.PORT}`));
