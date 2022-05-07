const http = require('http');
const { getPosts, getPost, createPost, updatePost, deletePost } = require('./controller/postController')
// const posts = require('./data/posts')

const server = http.createServer((req, res) => {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    // res.write('<h1>Hello World</h1>')

    const getRequest = req.url === '/api/posts' && req.method === 'GET';
    const getSingleRequest = req.url.match(/\/api\/posts\/([0-9]+)/) && req.method === 'GET';
    const postRequest = req.url === '/api/posts' && req.method === 'POST';
    const putRequest = req.url.match(/\/api\/posts\/([0-9]+)/) && req.method === 'PUT';
    const deleteRequest = req.url.match(/\/api\/posts\/([0-9]+)/) && req.method === 'DELETE';

    if (getRequest) {
        getPosts(req, res)
    } else if (getSingleRequest) {
        const id = req.url.split('/')[3]
        getPost(req, res, id)
    } else if (postRequest) {
        createPost(req, res)
    } else if (putRequest) {
        const id = req.url.split('/')[3]
        updatePost(req, res, id)
    } else if (deleteRequest) {
        const id = req.url.split('/')[3]
        deletePost(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }


})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))