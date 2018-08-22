require ("babel-polyfill");

const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const doodle = require('./google-sheets/doodles')
const timeout = require('connect-timeout');
const cors = require('cors');

app.use(timeout('5s'));
app.use(haltOnTimedout);
app.use(cors());

function haltOnTimedout (req, res, next) {
    if (!req.timedout) next();
}

app.get('/', (req, res) => {
    doodle.get().then((poodleDoodle) => {
        res.send(poodleDoodle);
    })
});

app.post('/poodle', (req, res) => {
    doodle.get().then((poodleDoodle) => {
        res.send({
            "response_type": "in_channel",
            "text": `Today's work is ${poodleDoodle}..!`,
        });
    })
});

app.use((err, req, res, next) => {
    if (err.error){
        res.status(err.error.status || 500)
    }
    res.json(err);
});

app.use((req, res, next) => {
    res.status(404).json({
        error: {
            status: 404,
            message: 'Ooops, not found!'
        }
    });
});

app.listen(port, () => console.log('Magic is happening on ' + port));
