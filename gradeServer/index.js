const express = require('./config/express');

const port = 4000;
express().listen(port);
console.log(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);