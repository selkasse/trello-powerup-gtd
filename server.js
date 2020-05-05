const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'https://trello.com' }));

app.use(express.static('_site'));

app.get("*", function(request, response){
    response.sendFile(__dirname + 'index.html');
});

let listener = app.listen(process.env.PORT, function() {
    console.log(`Your powerup is listening on port ${listener.address().port}`);
})