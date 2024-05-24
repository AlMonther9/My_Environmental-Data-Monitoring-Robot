const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(bodyParser.json());

app.post('/data', (req, res) => {
    const sensorData = req.body;
    io.emit('sensorData', sensorData);
    res.sendStatus(200);
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
