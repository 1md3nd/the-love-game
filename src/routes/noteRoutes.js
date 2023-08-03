const express = require('express');

const {createNote,updateNote,deleteNote,getNote} = require('../controllers/noteController');
const auth = require('../middleware/auth');

const noteRouter = express.Router();

noteRouter.get('/', auth, getNote);
noteRouter.post('/', auth, createNote);
noteRouter.put('/:id', auth, updateNote);
noteRouter.delete('/:id', auth, deleteNote);

module.exports = noteRouter;
