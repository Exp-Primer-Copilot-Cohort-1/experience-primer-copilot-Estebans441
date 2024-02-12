// Create web server
// 1. Import library
const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { ObjectId } = require('mongodb');

// 2. Create route
router.get('/', (req, res) => {
    db.collection('comments').find().toArray((err, result) => {
        if (err) {
            res.status(500).send('Error fetching comments from database');
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res) => {
    const comment = req.body;
    db.collection('comments').insertOne(comment, (err, result) => {
        if (err) {
            res.status(500).send('Error inserting comment into database');
        } else {
            res.send(result.ops[0]);
        }
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedComment = req.body;
    db.collection('comments').updateOne({ _id: ObjectId(id) }, { $set: updatedComment }, (err, result) => {
        if (err) {
            res.status(500).send('Error updating comment in database');
        } else {
            if (result.modifiedCount > 0) {
                res.send(updatedComment);
            } else {
                res.status(404).send('Comment not found');
            }
        }
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.collection('comments').deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting comment from database');
        } else {
            if (result.deletedCount > 0) {
                res.send('Comment deleted successfully');
            } else {
                res.status(404).send('Comment not found');
            }
        }
    });
});

// 3. Export router
module.exports = router;
