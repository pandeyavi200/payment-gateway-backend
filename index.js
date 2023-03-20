const express = require('express');
const bodyParser = require('body-parser');
const connects = require('./src/config/db');
const cors = require('cors');
const router = require('./src/routes/routes')
require('dotenv').config();

const app = express();
// configure bodyParser to parse JSON data
app.use(bodyParser.json());

// const corsOptions = {
//   origin: process.env.ORIGIN_URL,
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }
app.use(cors());
app.use('/', router)

// start the server
connects();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});