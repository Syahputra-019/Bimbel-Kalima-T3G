const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Bimbel-Kalima-T3G')
})

// Import all routes
const homeroute = require("./routes/home.js")
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})