var {exec, spawn} = require('child_process')
exec('bash test.sh', function(err, stdout, stderr){
    if (err) console.error(stderr);
    console.log(stdout);
});