const express = require('express')
const {getConnection} = require('./db/connect-mongoose')
const path = require('path')
const cors = require('cors');
require ('dotenv') . config ()

const app = express()
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/media',require('./routers/media'))
app.use('/director',require('./routers/director'))
app.use('/genero',require('./routers/genero'))
app.use('/productora',require('./routers/productora'))
app.use('/tipo',require('./routers/tipo'))

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

getConnection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})