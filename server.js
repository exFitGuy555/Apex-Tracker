const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')

//Load ENV
dotenv.config({
    path: './config.env'
})

const app = express()

//Dev wrapWithLogging
//Extra detailed log
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Profile Routes
app.use('/api/v1/profile', require('./routes/profile'))ף


//handle production
if(process.env.NODE_ENV === 'production'){
    //Set static Folder
    app.use(express.static(__dirname + '/public/'))

    //Handle SPA - any req thats not a part of our API
    app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html'))
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${port}`);
})