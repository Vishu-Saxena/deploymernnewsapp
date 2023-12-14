const express = require('express');
const dbConnect = require('./DBconnection/dbconnect');
const dotenv = require('dotenv');
const authRout = require('./router/authRoute');
const newsRout = require('./router/newsRoute');
const videoRoute = require('./router/videoRoute');
const cors = require('cors');
const app = express();
// app.use(cors());
app.use(cors(
    {
        origin: [""],
        methods: ["POST", "GET" , "PUT" ,"DELETE"],
        credentials: true
    }
));
dotenv.config();

app.get('/' , (req , res)=>{
    res.json('mansi saxena');
})
app.use(express.json());// req.body ke ander se data json format mai ata h , agr ye function use nhi kiya toh error ayega

app.use("/api/v1/auth" , authRout);
app.use("/api/v1/news" , newsRout);
app.use("/api/v1/video" , videoRoute);

dbConnect();

// server set-up
const port = process.env.PORT || 3000;
app.listen( port ,()=>{
    console.log(`server running over port ${port}`);
});