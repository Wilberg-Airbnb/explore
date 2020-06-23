const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '../../public'));

app.get('/:listingId', (req, res) => {
    var itemPage = path.join(__dirname, '../public/index.html');
    res.sendFile(itemPage);
})

app.listen(3001, () => {
    console.log('server listening on port 3001!')
})