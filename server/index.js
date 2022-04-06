const express = require('express')

const app = express()
const PORT = 8089

app.set('secret','sadhioasohdohsa')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))


app.get('/',(req,res)=>{
    res.send("hello world!")
})
require('./plugins/db')(app)
require('./routes/admin/index')(app)
require('./routes/web/index')(app)



app.listen(PORT,() =>{
    console.log(`SERVER IS RUNNING ON ${PORT} PORT`);
})
