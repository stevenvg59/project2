const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getBooks = async (req, res) => {
    const result  = await mongodb
    .getDb()
    .db('CS341')
    .collection('project2')
    .find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
};

const getOneBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db('CS341')
    .collection('project2')
    .find({ _id: bookId });
    result.toArray().then((lists) => {
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
    const response = await mongodb.getDb().db('CS341').collection('project2').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the book.');
    }
  };


module.exports = {
    getBooks, getOneBook, addBook
}