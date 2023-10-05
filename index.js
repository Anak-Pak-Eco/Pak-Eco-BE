const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const firebaseApp = require('./src/configs/firebase');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

app.post('/post-notification', (req, res) => {
  const {message} = req.body;

  firebaseApp.messaging().send({
    notification: {
      title: 'Test Notification',
      body: message,
    },
    topic: 'device_alert',
  }).then((response) => {
    res.status(200).json({
      message: 'Successfully send notification',
      data: response,
    });
  }).catch((error) => {
    res.status(400).json({
      message: 'Failed to send notification',
      data: error,
    });
  });
});

app.listen(8000, () => {
  console.log('Server connected to port 8000');
});
