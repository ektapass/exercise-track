const express = require('express');
const router = express.Router();

const User = require('../models/users.js');
// Remember INDUCES

// Index
router.get('/', (req, res)=>{
    User.find({}, (err, foundUser)=>{
        res.json(foundUser);
    });
});
// New - Will be handled by React application
// Delete
router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
        res.json(deletedUser);
    });
});
// Update
router.put('/:id', (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser)=>{
        res.json(updatedUser);
    });
});
// Create
router.post('/', (req, res)=>{
    User.create(req.body, (err, createdUser)=>{
        res.json(createdUser); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// Edit - Will be handled by React application
// Show
router.get('/:id', (req, res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        res.json(foundUser);
    });
});


module.exports = router;