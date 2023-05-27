const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', booksController.getBooks);
router.get('/:id', booksController.getOneBook);
router.post('/', validation.validateBook, booksController.addBook);
router.put('/:id', validation.validateBook, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;