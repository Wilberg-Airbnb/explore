const express = require('express');
const app = express();

app.use(express.static(__dirname + '../../public'));

app.get('/:listingId', (req, res) => {
    //this is an example route to test 
    console.log(req.path)
    // res.sendStatus(200);
    res.send()
})

app.listen(3001, () => {
    console.log('server listening on port 3001!')
})