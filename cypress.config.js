const { defineConfig } = require("cypress");
const {MongoClient} = require('mongodb').MongoClient;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        // Mongodb insert
        mongoInsert({ dbName, collection, doc }) {
          return MongoClient.connect('mongodb://localhost:27017').then((client) => {
            return client
              .db(dbName)
              .collection(collection)
              .insertOne(doc)
              .finally(() => client.close());
          });
        },
        // Mongodb find
        mongofind({ dbName, collection, query }) {
          return MongoClient.connect('mongodb://localhost:27017').then((client) => {
            return client
              .db(dbName)
              .collection(collection)
              .find(query)
              .toArray()
              .finally(() => client.close());
          });
        },
        // mongoDelete
        mongoDelete({ dbName, collection, filter }) {
          return MongoClient.connect('mongodb://localhost:27017').then((client) => {
            return client
              .db(dbName)
              .collection(collection)
              .deleteMany(filter)
              .finally(() => client.close());
          });
        }
      });
    },
    baseUrl: "https://test-automation-practice.netlify.app/#shop",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 4000,
    pageLoadTimeout: 60000,
    video: false,
    videoUploadOnPasses: false,
    screenshotOnRunFailure: true,
  },
  env: {
    baseUrl: "https://test-automation-practice.netlify.app/#shop"
  }
});
