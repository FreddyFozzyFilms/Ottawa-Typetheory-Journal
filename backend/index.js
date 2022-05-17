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

const leanCompilerRoute = require('./routes/LeanCompiler')
app.use('/api', leanCompilerRoute)

const server = require('http').createServer(app)
const WebSocket = require('ws')
const wss = new WebSocket.Server({server: server})

wss.on('connection', function connection(ws){
    console.log('new client connection')
    ws.send('hello banan')

    ws.on('message', function incoming(message){
        ws.send('hello %s', message)
    });
});

// PORT settings through Command Line
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));