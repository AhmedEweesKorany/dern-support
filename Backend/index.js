require("dotenv").config()
require("./config/dbConn")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
const Port = process.env.PORT || 3010
const corsOptions = require("./config/corsOptions")
const router  = require("./routes/router")

//applying middlewars  
app.use(cors())
app.use(express.json())
app.use(cookieParser()) 
// routing 
app.use(router)

app.listen(Port,()=>{
    console.log(`app is running at http://localhost:${Port}`)
}) 