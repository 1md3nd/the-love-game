const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const rockRouter = require('./routes/rockpaperRoutes');
const noteRouter = require('./routes/noteRoutes');
require('dotenv').config()

const app = express();
app.use(cors());

app.use(express.json());
app.use((req,res,next)=>{
    console.log('HTTP- '+req.method+'::'+'url- '+req.url);
    next();
});
app.use('/user',userRouter);
app.use('/game',rockRouter);
app.use('/note',noteRouter);


app.get('/',(req,res) =>{
    res.send('HEllo')
});

mongoose.connect(process.env.MONGODB)
.then(()=>{
    app.listen(5000,() =>{
        console.log('Server started on port : 5000');
    });
})
.catch((error) => {
    console.log(error)
});