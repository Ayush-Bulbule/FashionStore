require('dotenv').config()

const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')


app.use(cors())

const allowedOrigins = ['https://fashion-store-drab.vercel.app'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000

//Database connection
const url = 'mongodb+srv://ayushbulbule24:bjPnVgQ9rXv9OU1d@cluster0.k4iudhn.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database Connected!')
}).catch(err => {
    console.log("Connection Failed")
})

//Assets
app.use(express.static('uploads'))
//Express-enable json
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//GlobalMiddleware
app.use((req, res, next) => {
    // res.locals.session = req.session
    // res.locals.user = req.user
    next()
})


require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`App is Live on http://localhost:${PORT}`)
})