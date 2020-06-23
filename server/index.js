const express = require('express');
const app = express();
const db = require('../db/index.js')
const path = require('path');
const Promise = require('bluebird');

const promiseQuery = Promise.promisify(db.query).bind(db);

app.use(express.static(__dirname + '../../public'));
app.use(express.json())

app.get('/reservation/:listingId', (req, res) => {
    var listingId = req.path.split('/')[2];
    var query = `SELECT * FROM explore INNER JOIN options ON explore.id = options.explore_id WHERE listingId = ${listingId}`

    promiseQuery(query)
        .then(data => {
            let nearBy = data.map(el => el.opt);
            let explore = data[0];
            explore.nearBy = nearBy;
            res.json(explore)
            
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('/:listingId', (req, res) => {
    var itemPage = path.join(__dirname, '../public/index.html');
    res.sendFile(itemPage);
})

app.listen(3001, () => {
    console.log('server listening on port 3001!')
})