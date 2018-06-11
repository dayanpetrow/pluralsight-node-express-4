const express = require("express");
const adminRouter = express.Router();
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:adminRoutes");

function router(nav) {
  const books = [
    {
      bookId: 1,
      title: "dido"
    },
    {
      bookId: 320,
      title: "petrow"
    },
    {
      bookId: 550,
      title: "petrow"
    }
  ];
  adminRouter.route("/").get((req, res) => {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected correctly to server");

        const db = client.db(dbName);

        const response = await db.collection("books").insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    })();
  });
  return adminRouter;
}

module.exports = router;
