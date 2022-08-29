const express = require("express");
const app = express();
const dotnev = require("dotenv");
const notesRoute = require("./routes/notes");
const routeUser = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");

dotnev.config();

app.use(express.json());
app.use(cors());

app.use("/users",routeUser);
app.use("/note",notesRoute);



app.get("/",(req,res) =>{

    res.send("Notes Api")
})
const port = process.env.PORT ||5000;

mongoose.connect(process.env.MONGO_URL +"")
.then(()=>{
    app.listen(port,()=>{

        console.log("Started")

    })

}).catch((error)=>{

   console.log(error);

})

