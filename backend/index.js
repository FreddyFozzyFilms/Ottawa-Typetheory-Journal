const express = require('express');
const cors = require("cors")
const app = express();
var {exec, spawn} = require('child_process')

//banana

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

app.post('/api/leancompiler', (req, res) => {
    console.log(req.body);
    return res.json(req.body);
});

app.get('/api/ls', (req, res) => {
    exec('ls', function(err, stdout, stderr){
        if (err) console.error(stderr);
        res.send(stdout);
    });
})


// PORT settings through Command Line
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));