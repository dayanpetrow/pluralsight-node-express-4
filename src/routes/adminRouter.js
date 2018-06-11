const express = require("express");
const adminRouter = express.Router();
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:adminRoutes");
const bookService = require('../services/goodreadsService');

const MAX_BOOK_ID = 41000000;

function router(nav) {
  adminRouter.route("/add_random_book").get((req, res) => {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected correctly to server");

        const db = client.db(dbName);

        let random_book = Math.random() * MAX_BOOK_ID;

        const book_result = await bookService.getBookById(random_book);

        const book = {
            bookId: `${book_result.id}`,
            title: `${book_result.title}`,
            img: `${book_result.image_url}`
        }

        const collection = await db.collection("books");
        const response = await collection.insertOne(book);
        res.json(book_result);
        //res.redirect('/books')
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    })();
  });
  return adminRouter;
}

module.exports = router;
