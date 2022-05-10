const express = require('express');
const cors = require("cors")
const app = express();

//apple

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

// exec bash scripts
var {exec, spawn} = require('child_process')
// show files in directory
app.get('/api/ls', (req, res) => {
    exec('ls', function(err, stdout, stderr){
        if (err) console.error(stderr);
        res.send(stdout);
    });
})

const fs = require('fs');
app.post('/api/leancompiler', (req, res) => {

  // write to test.lean file
  fs.writeFile('./leanproj/src/test.lean', req.body.code, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  // run the lean compiler on the test file
  exec('bash test.sh', function(err, stdout, stderr){
    if (err) console.error(stderr);
    res.json({stdout});
  });
})


// PORT settings through Command Line
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));