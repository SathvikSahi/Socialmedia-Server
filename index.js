const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const connectDb = require('./db/connect');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const searchRouter = require('./routes/searchRoutes');

app.use(express.json( {limit: '50mb'} ));
app.use(express.urlencoded( {extended: false} ));
app.use(cors());
app.use(bodyParser.json());

app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/search', searchRouter);

app.use('*', (req, res) => {
    res.status(404).json( {message: 'Invalid http request'} );
});

const url = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

const start = async () => {
    try 
    {
        await connectDb(url);
        app.listen(port, console.log('server running...'));
    }

    catch (error)
    {
        console.log(error);
    }
};

start();