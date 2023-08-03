const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const rockRouter = require('./routes/rockpaperRoutes');
const noteRouter = require('./routes/noteRoutes');

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

mongoose.connect('mongodb+srv://anurag:MpNRfZtZAQD5hefL@cluster0.rdkfqxh.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    app.listen(5000,() =>{
        console.log('Server started on port : 5000');
    });
})
.catch((error) => {
    console.log(error)
});