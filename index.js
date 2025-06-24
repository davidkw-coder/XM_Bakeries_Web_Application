const functions = require('firebase-functions');
const express = require('express');
const app = require('./server'); // Export your express app
const app = express();

exports.api = functions.https.onRequest(app);
