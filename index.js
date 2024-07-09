const express = require('express');
const app = express();

require('./startup/routes')(app)
require('./startup/validation')
require('./startup/db')()
require('./startup/configure')
require('./startup/prod')(app)
app.get('/', (req, res) => {
    res.send("welcome in express ")
});

//create server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})

