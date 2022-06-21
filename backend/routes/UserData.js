// Copyright (c) 2022 FreddyFozzyFilms. All rights reserved.
// Released under MIT license as described in the file LICENSE.
// Authors: Frederick Pu
// Defines REST commands for changing notebook data (for the gallery)

const express = require('express')
const router = express.Router()

const fs = require('fs')

// read all of the cells
router.get('/read', (req, res) => {
    fs.readFile('./userdata.json', 'utf8', (err, raw_data) => {
        if (err) {
          console.error(err);
          return;
        }
        const data = JSON.parse(raw_data);
        res.send(data);

        return;
    });
})

// read one cell
router.get('/read/:id', (req, res) => {
    fs.readFile('./userdata.json', 'utf8', (err, raw_data) => {
        if (err) {
          console.error(err);
          return;
        }
        const data = JSON.parse(raw_data);
        res.send(data.userdata[req.params.id]);
        return;
    });
})

router.post('/write/:id', (req, res) => {
    fs.readFile('./userdata.json', 'utf8', (err, raw_data) => {
        
        if (err) { console.error(err); return; }

        const data = JSON.parse(raw_data);
        console.log({...req.body, id:data.length});

        if (req.params.id < data.userdata.length)
            data.userdata[req.params.id] = {...req.body, id:parseInt(req.params.id)};
        else
            data.userdata.push({...req.body, id:parseInt(req.params.id)})
        
        fs.writeFile('./userdata.json', JSON.stringify(data), err => {
            if (err) {console.error(err);}
            // file written successfully
        });

        res.send(data)
    });
    
})

router.get('/delete/:id', (req, res) => {
    fs.readFile('./userdata.json', 'utf8', (err, raw_data) => {
        
        if (err) { console.error(err); return; }

        const data = JSON.parse(raw_data);
        data.userdata.splice(req.params.id, 1);
        data.userdata = data.userdata.map((notebook,id) => (
            {...notebook, id: id}
        ))
        
        fs.writeFile('./userdata.json', JSON.stringify(data), err => {
            if (err) {console.error(err);}
            // file written successfully
        });

        res.send(data)
    });
});
module.exports = router;