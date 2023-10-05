const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const notificationRoute = require('./src/routes/notification_routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/notification', notificationRoute);

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server connected to port 8000');
});
