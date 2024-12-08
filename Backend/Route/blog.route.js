import express, { Router } from 'express'
import {addBlog, removeBlog, getBlog, getById, updateBlog, likeBlog, dislikeBlog, commentBlog, displayCommentBlog, latestBlog} from '../Controller/blog.controller.js'
import Authenticate from '../MiddleWare/Authenticate.js'

const router = express.Router()

router.post('/addblog', addBlog)
router.post('/removeblog', removeBlog)
router.put('/updateblog',  updateBlog)
router.post('/likeblog', Authenticate, likeBlog)
router.post('/dislikeblog', Authenticate, dislikeBlog)


router.post('/commentblog', Authenticate ,commentBlog)

router.get('/getcomment/:id', displayCommentBlog)


router.get('/getblog', getBlog)
router.get('/latestblog', latestBlog)
router.get('/blog/:id', getById)


export default router