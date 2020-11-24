const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const routes = require('./routes.js')

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded());

app.use(routes)

app.listen(3333)