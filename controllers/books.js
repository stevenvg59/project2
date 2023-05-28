const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getBooks = async (req, res) => {
    const response  = await mongodb
    .getDb()
    .db('CS341')
    .collection('project2')
    .find();
    console.log(response);
    response.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
};

const getOneBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb
    .getDb()
    .db('CS341')
    .collection('project2')
    .find({ _id: bookId });
    console.log(response);
    response.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
  });
  };

const addBook = async (req, res) => {
    const book = {
      name: req.body.name,
      author: req.body.author,
      isbn: req.body.isbn,
      language: req.body.language,
      date: req.body.date,
      funfact: req.body.funfact
    };
    const response = await mongodb
    .getDb()
    .db('CS341')
    .collection('project2')
    .insertOne(book);

    console.log(response);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the book.');
    }
  };

  const updateBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    const book = {
      name: req.body.name,
      author: req.body.author,
      isbn: req.body.isbn,
      language: req.body.language,
      date: req.body.date,
      funfact: req.body.funfact
    }
    const response = await mongodb
    .getDb()
    .db('CS341')
    .collection('project2')
    .replaceOne({ _id: bookId }, book);

    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the book');
    }
  };

  const deleteBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb
    .getDb()
    .db('CS341')
    .collection('project2')
    .deleteOne({ _id: bookId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the book');
    }
  }

module.exports = {
    getBooks, getOneBook, addBook, updateBook, deleteBook
}