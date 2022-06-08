const express = require('express')
const router = express.Router()

const fs = require('fs')

router.get('/read/:id', (req, res) => {
    fs.readFile('./userdata.json', 'utf8', (err, raw_data) => {
        if (err) {
          console.error(err);
          return;
        }
        const data = JSON.parse(raw_data);
        res.send(data.userdata[req.params.id]);
        //res.send(data.userdata[parseInt(req.params.id)]);
        return;
    });
})

router.post('/write', (req, res) => {
    fs.readFile('./userdata.json', 'utf8', (err, raw_data) => {
        if (err) {
          console.error(err);
          return;
        }
        const data = JSON.parse(raw_data);
        console.log({...req.body, id:data.length});
        data.userdata.push({...req.body, id:data.userdata.length});
        
        fs.writeFile('./userdata.json', JSON.stringify(data), err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
        });

        res.send(data)
    });
})

router.post('/modify/:id', (req, res) => {
    fs.readFile('./userdata.json', 'utf8', (err, raw_data) => {
        
        if (err) { console.error(err); return; }

        const data = JSON.parse(raw_data);
        console.log({...req.body, id:data.length});
        data.userdata[req.params.id] = {...req.body, id:parseInt(req.params.id)};
        
        fs.writeFile('./userdata.json', JSON.stringify(data), err => {
            if (err) {console.error(err);}
            // file written successfully
        });

        res.send(data)
    });
})
module.exports = router;