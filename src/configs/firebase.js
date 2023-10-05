const admin = require('firebase-admin');
const firebaseAccount = require('./firebaseCredential.json');

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(firebaseAccount),
  databaseURL: 'https://pak-eco-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'pak-eco',
});

module.exports = firebaseApp;
