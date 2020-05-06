const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors({ origin: 'https://trello.com' }));

app.use(express.static('_site'));

app.get("*", function(request, response){
    response.sendFile(__dirname + 'index.html');
});

let listener = app.listen(process.env.PORT, function() {
    console.log(`Your powerup is listening on port ${listener.address().port}`);
})

fetch('https://api.trello.com/1/members/me?key=41ae5bff41af5eac3f32ad7a4daab49e&token=5e71d684035b882896f8ecfc32de15dee8c64b0e73b8c965609c3c7473f47661', {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
    .then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));