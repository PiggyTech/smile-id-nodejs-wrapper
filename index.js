import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import * as Sentry from '@sentry/node';

import verifySelfieRoute from "./routes/verifyImage";

const createError = require('http-errors');
const promiseMiddleware = require('./middlewares/promise');
const app = express();
app.use(cors());
dotenv.config();

app.use(Sentry.Handlers.requestHandler());

app.use(bodyParser.json());

app.use(promiseMiddleware());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json({ limit: '500kb' }));
app.use(express.static('public'));

app.use('/api/v1', verifySelfieRoute);

app.use(function(req, res, next) {
  res.promise(Promise.reject(createError(404)));
});
app.use(function(err, req, res, next) {
  res.promise(Promise.reject(err));
});

app.listen(5000, function () {
  console.log("Server is running..");
});

app.use(Sentry.Handlers.errorHandler());

export default app
