console.log("Starting Pi - mBotInf Started on " + process.platform + " with node version " + process.version);
require('dotenv').config({ path: './config.env' });
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ioSocket;

var SerialPort;
if (process.env.simulation == 'true') {
    SerialPort = require('virtual-serialport');
}
else {
    SerialPort = require('serialport');
}

console.log("Dependancies Found");

portName = process.env.serialport;
settings = { baudRate: 115200, dataBits: 8, stopBits: 1, parity: 'none' };

var port = Number(process.env.nodeport) || 1337;
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html')
});


http.listen(port, function () {
    console.log("Listening on port " + port);
});

io.on('connection', function (socket) {
    socket.broadcast.emit('Server Connected');
    ioSocket = socket;
    socket.on('disconnect', function () {
        console.log('Socket.IO  disconnected ' + socket.id);
    });
    socket.on('connect_failed', function () {
        console.log('socket.io connect_failed');
    })
    socket.on('reconnect_failed', function () {
        console.log('socket.io reconnect_failed');
    })
    socket.on('error', function (err) {
        console.log('socket.io error:' + err);
    })
    socket.on('Command', function (data) {
        console.log('Command ' + JSON.stringify(data));
        var writeString = '';
        if (data.cmd) {
            writeString += data.cmd;
            if (data.cmd && (data.cmd == 'MODE' || data.cmd == 'SYNC')) {
                writeString += ' ' + data.val.toString();
            }
            writeString += '\r\n';

            if (sp) {
                sp.write(writeString);
            }
        }
    });
});

sp = new SerialPort(portName, settings);

sp.on('error', function (err) {
    console.log('Serial port ' + portName + ' Error: ', err.message);
})
sp.on('open', function () {
    console.log("Serial port connected to "+data);
});
var receiveString = "";
sp.on('data', function (data) {
    console.log(data);

    if (ioSocket) {
        //receiveString += data.toString();
        //console.log("\nReceiveString:" + receiveString);
        ioSocket.emit('data', data.toString());
    }
});

module.exports = app;
console.log("Pi - mBotInf Started");

