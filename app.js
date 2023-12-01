const express = require('express') // common js (require, not es6)
const debug = require('debug')('app')
const chalk = require('chalk')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.use(morgan('tiny')) // middleware
app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', (req, res) => {
    res.send('hello from my app')
})

app.listen(3000, ()=>{
    console.log(`listening on port ${chalk.green('3000')}`)
})



