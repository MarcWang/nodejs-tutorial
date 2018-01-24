const app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    rtsp = require('./rtsp-ffmpeg');

const util = require('util');
server.listen(3000);


function nvrServer() {
    this._streamPools = new Map();
    this._stream = new rtsp.FFMpegService();
    this._enableServerListen = false;
    this._enableClientListen = false;
}

util.inherits(nvrServer, require('events').EventEmitter);

nvrServer.prototype.openStream = function(url) {
    let self = this;

    let setting = undefined;
    if (url.includes('localcamera')) {
        setting = new rtsp.WebCamSetting();
        let segStr = url.split("localcamera/");
        setting.device = 0;
    } else {
        setting = new rtsp.RTSPSetting();
        setting.url = url;
    }

    let pid = self._stream.open(setting);

    self._streamPools.set(pid, { frame: undefined, sett: setting });


    if (!self._enableServerListen) {
        self._stream.onCapture((err, res) => {
            // console.log(`Capture from ${res.pid}`);
            self._streamPools.set(res.pid, { frame: res.data });
            let captureData = { pid: res.pid, frame: res.data };
            self.emit('IMAGE_CAPTURE', captureData);
        });

        self._stream.onExit((err, res) => {
            //console.log(`Close Stream ${res}`);
        });
    }
    self._enableServerListen = true;


    return pid;
}

nvrServer.prototype.getRunStreamId = function() {
    let self = this;
    return self;
}

nvrServer.prototype.onCaptureFrame = function(cb) {
    let self = this;

    if (!self._enableClientListen) {
        self.on('IMAGE_CAPTURE', (data) => {
            cb(null, data);
        })
    }
    self._enableClientListen = true;
}

nvrServer.prototype.getFrame = function(pid) {
    let self = this;
    // console.log(self._streamPools.get(pid));

    return self._streamPools.get(pid).frame;
}




let streamServer = new nvrServer();

// let stream1 = streamServer.openStream('rtsp://192.168.10.199/v2');
// let stream2 = streamServer.openStream('rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov');
// rtsp://192.168.10.210/v2
// rtsp://admin:admin@192.168.10.233:554/
// rtsp://root:pass@192.168.10.228:554/axis-media/media.amp
// rtsp://root:pass@192.168.10.238:554/axis-media/media.amp
// rtsp://192.168.10.241:554/live2.sdp
// rtsp://admin:123456@192.168.10.242:7070/onvif-stream1
// rtsp://admin:123456@192.168.10.243:7070/onvif-stream1
// rtsp://192.168.10.199/v2
// rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov


let channels = [];
let index = 0;

function addChannel(url) {
    let pid = streamServer.openStream(url);
    channels.push({ index: index, pid: pid });
    index++;
}
addChannel('rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov');
addChannel('rtsp://admin:admin@192.168.10.233:554/');
addChannel('rtsp://admin:123456@192.168.10.243:7070/onvif-stream1');
addChannel('rtsp://admin:123456@192.168.10.242:7070/onvif-stream1');
addChannel('rtsp://root:pass@192.168.10.238:554/axis-media/media.amp');
// addChannel('localcamera/0');

var counter = 0;
var clients = {}

io.on('connection', function(socket) {
    
    // clients[socket.id] = socket;
    counter++;
    console.log(`${socket.id} , total count = ${counter}`);

    let intervalId = setInterval(() => {
        for (let i in channels) {
            if (streamServer.getFrame(channels[i].pid) != undefined) {
                socket.emit(`data${i}`, streamServer.getFrame(channels[i].pid).toString('base64'));
            }
        }
    }, 50);

    // let count = 0;
    // streamServer.onCaptureFrame((err, res) => {
    //     let frame = res.frame;
    //     let pid = res.pid;
    //     if (err) {
    //     } else {
    //         for (let i in channels) {
    //             if (pid == channels[i].pid) {
    //                 count++;
    //                 // console.log(count);
    //                 // console.log(`data${channels[i].index} = ${pid}`);
    //                 socket.emit('data0', "frame.toString('base64')");
    //                 socket.emit('data1', "frame.toString('base64')");
    //                 socket.emit('test', "frame.toString('base64')");
    //                 // socket.emit(`data${channels[i].index}`, frame.toString('base64'));
    //             }
    //         }
    //     }
    // })

    socket.on('disconnect', function(data) {
        counter--;
        console.log(`disconnect = ${socket.id}`);
        // delete clients[socket.id];
        
        clearInterval(intervalId);
    });
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
