const express = require('express')
const cors = require('cors')
const server = express()

const postRouter = require('./posts/posts-router')

server.use(cors())
server.use(express.json())

server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
    res.send('Server is up.')
})

module.exports = server