const express = require("express");
const { MongoClient } = require('mongodb');
const adminRouter = express.Router();
const debug = require('debug')('app:adminRoutes');

function router(nav) {
    const books = [
        {
          id: 1,
          title: "dido"
        },
        {
          id: 2,
          title: "petrow"
        }
      ];
    adminRouter.route('/').get((req,res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to server');

                const db = client.db(dbName);

                const response = await db.collection('books').insertMany(books);
                res.json(response);
            } catch(err) {
                debug(err.stack);
            }

            client.close();

        }());
    });
    return adminRouter;
}

module.exports = router;