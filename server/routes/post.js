const express = require('express');
const multer = require('multer');
const Post = require('./../models/post');
const { requireAuthorization } = require('./../middlewares/requireAuth');
const router = express.Router();
const path = require('path');
var appDir = path.dirname(require.main.filename);
const uploadsPostDir = "/public/uploads/posts/";
const postPhotoUpload = multer({dest: appDir + uploadsPostDir});
const fs = require('fs');

router.post('/posts', requireAuthorization, postPhotoUpload.single('photo'), (req, res, next) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(400).json({
            s: false,
            ed: 'Please fill all the fields!'
        });
    }
    const post = new Post({
        title,
        body,
        postedBy: req.user
    });
    console.log("File Details: ", req.file);
    if (req.file) {
        const originalFileName = req.file.originalname;
        const fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.') + 1);
        const photoFinalPath = appDir + uploadsPostDir + req.file.filename + "." + fileExtension;
        fs.renameSync(req.file.path, photoFinalPath);
        post.photo = photoFinalPath;   
    }
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