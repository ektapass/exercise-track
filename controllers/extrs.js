const express = require('express');
const router = express.Router();
const Extrs = require('../models/extrs.js');
// Remember INDUCES

// Index
router.get('/', (req, res)=>{
    Extrs.find({}, (err, foundExtrs)=>{
        res.json(foundExtrs);
    });
});
// New - Will be handled by React application
// Delete
router.delete('/:id', (req, res)=>{
    Extrs.findByIdAndRemove(req.params.id, (err, deletedExtr)=>{
        res.json(deletedExtr);
    });
});
// Update
router.put('/:id', (req, res)=>{
    Extrs.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedExtr)=>{
        res.json(updatedTodo);
    });
});
// Create
router.post('/', (req, res)=>{
    Extrs.create(req.body, (err, createdExtr)=>{
        res.json(createdExtr); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// Edit - Will be handled by React application
// Show
router.get('/:id', (req, res)=>{
    Extrs.findById(req.params.id, (err, foundExtr)=>{
        res.json(foundExtr);
    });
});


module.exports = router;