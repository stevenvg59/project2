const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');

router.get('/', booksController.getBooks);
router.get('/:id', booksController.getOneBook);
router.post('/', booksController.addBook)

module.exports = router;