const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

const ALGOLIA_ID = "G0Q3879ZFO";
const ALGOLIA_ADMIN_KEY = "23f31cdf5e03709a9f91df00c3258baa";
const ALGOLIA_SEARCH_KEY = "ae8a0837265b91c4224604d4954cef32";

const ALGOLIA_INDEX_NAME = "REs";

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

admin.initializeApp(functions.config().firebase);
const database = admin.firestore();
