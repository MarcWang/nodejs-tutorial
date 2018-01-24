const Agenda = require('agenda');
const moment = require('moment');

// const agenda = new Agenda();
// const options = {
//     socketTimeoutMS: 0,
//     keepAlive: true,
//     reconnectTries: 30,
//     autoReconnect: true
// }
// agenda.database('localhost:27017/waffle_pns', 'jobs', options);

agenda.define('EVENT_1', { priority: 'high', concurrency: 10 }, (job, done) => {
    console.log(job.attrs);
    done();
});

agenda.on('ready', function() {
    const publish_at = '2017-11-15 11:44';
    const now = moment(publish_at, 'YYYY-MM-DD HH:mm');
    const time = now.toDate();
    console.log(time)
    agenda.schedule(time, 'EVENT_1', { id: '0014' });

    agenda.start();
});

agenda.on('start', function(job) {
    console.log('Job %s starting', job.attrs.name);
});

agenda.on('complete', function(job) {
    console.log('Job %s finished', job.attrs.name);
});

class JobSchedule {

    constructor() {
        this.agenda = new Agenda();
    }

    initialize() {
        let self = this;
        return new Promise((resolve, reject) => {
            const options = {
                socketTimeoutMS: 0,
                keepAlive: true,
                reconnectTries: 30,
                autoReconnect: true
            }
            self.agenda.database('localhost:27017/waffle_pns', 'jobs', options);
            agenda.on('ready', () => {
                agenda.start();
                resolve();
            });
        });
    }

    onBoardJob() {
        let self = this;
        self.agenda.define('BOARD', { priority: 'high', concurrency: 10 }, (job, done) => {
            console.log(job.attrs);
            done();
        });
    }
}