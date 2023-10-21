const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const notificationRoute = require('./src/routes/notification_routes');
const devicesRoute = require('./src/routes/devices_routes');
const plantsRoute = require('./src/routes/plants_routes');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/notifications', notificationRoute);
app.use('/devices', devicesRoute);
app.use('/plants', plantsRoute);
app.get('/tools/generate-uuid', (req, res) => {
  const uuid = crypto.randomUUID();
  return res.status(200).json({
    message: 'Success generate random UUID',
    status: true,
    data: {
      uuid: uuid.toLocaleUpperCase(),
    },
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server connected to port 8000');
});
