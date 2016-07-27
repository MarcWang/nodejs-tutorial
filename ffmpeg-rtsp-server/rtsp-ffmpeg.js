const spawn = require('child_process').spawn;
const util = require('util');

function RTSPSetting() {
    this.getName = () => {
        return 'RTSP';
    };
    this.url = undefined;
    this.fps = 15;
    this.resolution = {
        width: 320,
        height: 240
    };
    this.quality = 7;
};
module.exports.RTSPSetting = RTSPSetting;

function WebCamSetting() {
    this.getName = () => {
        return 'WEBCAM';
    };
    this.device = 0;
    this.fps = 25;
    this.resolution = {
        width: 640,
        height: 480
    };
    this.quality = 7;
}
module.exports.WebCamSetting = WebCamSetting;



var FFMpegProcess = function() {
    this._process = [];
};
util.inherits(FFMpegProcess, require('events').EventEmitter);


FFMpegProcess.prototype.getRTSPCamArgs = function(setting) {
    let url = '';
    if (setting.url) {
        url = setting.url;
    } else {
        throw new Error('no `url` parameter');
    }
    let fps = `${setting.fps}`;
    let resolution = `${setting.resolution.width}x${setting.resolution.height}`;
    let quality = `${setting.quality}`;
    let args = [];
    return args.concat(['-loglevel', 'quiet', '-i', url.toString(), '-r', fps.toString(), '-q:v', quality.toString(), '-f', 'image2', '-updatefirst', '1', '-', '-s', resolution.toString()]);
};

// ffmpeg -f dshow -i video="Camera"
// ffmpeg -f dshow -video_device_number 1 -i video="Camera"
FFMpegProcess.prototype.getWebcamArgs = function(setting) {
    let device = `${setting.device}`;
    let fps = `${setting.fps}`;
    let quality = `${setting.quality}`;
    let resolution = `${setting.resolution.width}x${setting.resolution.height}`;
    return ['-f', 'vfwcap', '-i', device, '-q:v', quality, '-s', resolution, '-r', fps, '-f', 'image2', '-updatefirst', '1', '-'];
}

//ffmpeg -list_devices true -f dshow -i dummy
FFMpegProcess.prototype.getLocalDevices = function() {
    const exec = require('child_process').exec;
    exec('ffmpeg -list_devices true -f dshow -i dummy', (error, stdout, stderr) => {
        if (error) {
            let msg = error.toString();
            let segStr = msg.split("    ");
            let videoStr = segStr[1];
            for( let i in segStr){
                console.log( segStr[i] );
                console.log( '-------------------' );
                console.log( '-------------------' );
            }
            return;
        }
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
    });
}

// ['-list_devices', 'true', '-f', 'dshow', '-i', 'dummy', '-']


FFMpegProcess.prototype.open = function(settings) {
    let self = this;

    // this.getLocalDevices();

    let childProc = null;
    if (settings.getName() == 'WEBCAM') {
        childProc = spawn('ffmpeg', this.getWebcamArgs(settings));
    } else if (settings.getName() == 'RTSP') {
        childProc = spawn('ffmpeg', this.getRTSPCamArgs(settings));
    }

    if (childProc == null) {
        return undefined;
    }

    childProc.stdout.on('data', (data) => {
        self.emit('data', { pid: childProc.pid, data: data });
    });

    childProc.stderr.on('data', (data) => {
        self.emit('err', { pid: childProc.pid, data: data });
    });

    childProc.on('close', (code) => {
        self.emit('close', childProc.pid);
        for (let i in self._process) {
            if (childProc.pid == self._process[i].pid) {
                self._process.slice(i, 1);
            }
        }
    });

    self._process.push({
        pid: childProc.pid,
        proc: childProc
    });

    return childProc.pid;
};

FFMpegProcess.prototype.onCapture = function(cb) {
    let self = this;
    self.on('data', (data) => {
        cb(null, data);
    });
}

FFMpegProcess.prototype.onExit = function(cb) {
    let self = this;
    self.on('close', (data) => {
        cb(null, data);
    });
}

FFMpegProcess.prototype.close = function(pid) {
    let self = this;
    try {
        for (let i in self._process) {
            if (pid == self._process[i].pid) {
                self._process[i].proc.kill();
            }
        }
    } catch (e) {
        throw new Error(e);
    }
};

module.exports.FFMpegService = FFMpegProcess;
