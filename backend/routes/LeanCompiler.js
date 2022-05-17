const express = require('express')
const router = express.Router()

// exec bash scripts
var {exec, spawn} = require('child_process')
// show files in directory
router.get('/ls', (req, res) => {
    exec('ls', function(err, stdout, stderr){
        if (err) console.error(stderr);
        res.send(stdout);
    });
})

const fs = require('fs');
router.post('/leancompiler', (req, res) => {

  // write to test.lean file
  fs.writeFile('./leanproj/src/test.lean', req.body.code, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  // run the lean compiler on the test file
  exec('bash ./test.sh', function(err, stdout, stderr){
    if (err) console.error(stderr);
    res.json({stdout});
  });
})

module.exports = router;