// Copyright (c) 2022 FreddyFozzyFilms. All rights reserved.
// Released under MIT license as described in the file LICENSE.
// Authors: Frederick Pu
// Defines all main routes for the application backend.

const express = require('express');
const cors = require("cors")
const app = express();

const leanCompilerRoute = require('./routes/LeanCompiler')
const userData = require('./routes/UserData')

// white list
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

// lean compiler api requests
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.post('/api/ping', (req, res) => {
  console.log(req.body);
  return res.json(req.body);
});

app.use('/api', leanCompilerRoute)
app.use('/api/notebook', userData)

// PORT settings through Command Line
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));