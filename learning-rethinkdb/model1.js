const config = {
    min: 50,
    max: 1000,
    timeoutError: 1000,
    timeoutGb: 60 * 60 * 1000,
    host: "localhost",
    port: 28015,
    authKey: "",
    db: "rethinkdb_demo"
};
const thinky = require('thinky')(config);
thinky.dbReady().then(() => { console.log('ready') })

const VideoModel = thinky.createModel("Video", {
    id: thinky.type.string(),
    name: thinky.type.string(),
    description: thinky.type.string().default('no description'),
    path: thinky.type.string(),
    tag: [thinky.type.string()],
    metaData: {
        width: thinky.type.number(),
        height: thinky.type.number(),
        ratio: thinky.type.string(),
        duration: thinky.type.string(),
        size: thinky.type.number()
    }
});

let data = {
    name: 'VideoName',
    path: './videos/123.mp4',
    tag: ['male', 'young'],
    metaData: {
        width: 640,
        height: 480
    }
}

let video = new VideoModel(data);
video.save()
    .then((model) => {
        console.log(model)
    })
    .error((error) => {
        console.log(error)
    });
