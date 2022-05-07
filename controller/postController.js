const Post = require('../models/postModel');
const { getPostData } = require('../utils');


// @desc Gets all posts
// @route GET /api/posts
async function getPosts(req, res) {
    try {
        const posts = await Post.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(posts))
    } catch (error) {
        console.log(error);
    }
}

// @desc Gets single post
// @route GET /api/post/:id
async function getPost(req, res, id) {
    try {
        const post = await Post.findById(id)

        if (!post) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Message Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(post))
        }

    } catch (error) {
        console.log(error);
    }
}

// @desc Create a post
// @route POST /api/posts
async function createPost(req, res) {
    try {

        const body = await getPostData(req)

        const bodyData = JSON.parse(body)

        const newPost = await Post.create(bodyData)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newPost))

    } catch (error) {
        console.log(error);
    }
}

// @desc updates single post
// @route PUT /api/post/:id
async function updatePost(req, res, id) {
    try {

        const post = await Post.findById(id)

        if (!post) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Post Not Found' }))
        } else {
            const body = await getPostData(req)

            const bodyData = JSON.parse(body)

            const postData = {
                title: bodyData.title || post.title,
                body: bodyData.body || post.body
            }

            const updPost = await Post.update(id, postData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updPost))
        }

    } catch (error) {
        console.log(error);
    }
}

// @desc deletes single post
// @route DELETE /api/post/:id
async function deletePost(req, res, id) {
    try {

        const post = await Post.findById(id)

        if (!post) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Post Not Found' }))
        } else {
           
            await Post.remove(id)

            res.writeHead(204, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({message : `Post ${id} removed`}))
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}