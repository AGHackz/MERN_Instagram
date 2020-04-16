const express = require('express');
const mongoose = require('mongoose');
const Post = require('./../models/post');
const { requireAuthorization } = require('./../middlewares/requireAuth');
const router = express.Router();

router.post('/posts', requireAuthorization, (req, res, next) => {
    const { title, body, photo } = req.body;
    if (!title || !body) {
        return res.status(400).json({
            s: false,
            ed: 'Please fill all the fields!'
        });
    }
    const post = new Post({
        title,
        body,
        photo,
        postedBy: req.user
    });
    post.save()
    .then(savedPost => {
        if (savedPost) {
            return res.json({
                s: true,
                msg: 'Post created successfully!',
                data: savedPost
            })
        } else {
            return res.status(400).json({
                s: false,
                ed: 'Something went wrong!'
            });
        }
    })
    .catch(err => {
        return res.status(400).json({
            s: false,
            ed: err.message,
            error: err
        });
    });
});

router.get('/posts/my', requireAuthorization, (req, res, next) => {
    const userId = req.user._id;
    Post.find( { 'postedBy': userId})
    .populate('postedBy', '_id name')
    .then(result => {
        return res.json({
            s: true,
            count: result.length,
            data: result
        });
    })
    .catch(err => {
        return res.status(400).json({
            s: false,
            ed: err.message,
            error: err
        });
    });
});

router.get('/posts/:id', requireAuthorization, (req, res, next) => {
    const id = req.params.id;
    Post.findOne( {'_id': id})
    .populate('postedBy', '_id name')
    .then(result => {
        if (result) {
            return res.json({
                s: true,
                data: result
            });
        } else {
            return res.json({
                s: true,
                msg: 'No post found.'
            });
        }
    })
    .catch(err => {
        return res.status(400).json({
            s: false,
            ed: err.message,
            error: err
        });
    });
});

router.get('/posts', requireAuthorization, (req, res, next) => {
    Post.find()
    .populate('postedBy', '_id name')
    .then(result => {
        return res.json({
            s: true,
            count: result.length,
            data: result
        });
    })
    .catch(err => {
        return res.status(400).json({
            s: false,
            ed: err.message,
            error: err
        });
    });
});

module.exports = router;