const express = require('express')

const app = express()
const PORT = 8089

app.use(require('cors')())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello world!")
})

require('./routes/admin/index')(app)


app.listen(PORT,() =>{
    console.log(`SERVER IS RUNNING ON ${PORT} PORT`);
})
