var admin = require("firebase-admin");

var serviceAccount = require(process.env.FILE);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
