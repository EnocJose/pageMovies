const express = require('express')
const {getConnection} = require('./db/connect-mongoose')
require ('dotenv') . config ()

const app = express()
const port = process.env.PORT;

getConnection();

app.use(express.json());

app.use('/media',require('./routers/media'))
app.use('/director',require('./routers/director'))
app.use('/genero',require('./routers/genero'))
app.use('/productora',require('./routers/productora'))
app.use('/tipo',require('./routers/tipo'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})