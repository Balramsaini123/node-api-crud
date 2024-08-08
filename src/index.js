const express = require('express')
const route = require('./router/task-manager.js')
require("./db/mongoose.js")

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(route)


app.listen(port, () => {
    console.log('Server is up to port ' + port)
})