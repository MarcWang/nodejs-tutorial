require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.IMG_CLOUDINARY_AC,
    api_key: process.env.IMG_CLOUDINARY_API_KEY,
    api_secret: process.env.IMG_CLOUDINARY_API_SEC
});

const file = './../assets/images/waffle.png';
const options = {
    tags: 'waffle'
}

// Upload Image with local file path
cloudinary.uploader.upload(file, options, (result) => {
    console.log('Upload Image with local file path');
    console.log('----------------------------------');
    console.log(result);
});

// Upload Image with stream
const upload_stream = cloudinary.uploader.upload_stream(options, (err, result) => {
    console.log('Upload Image with stream');
    console.log('----------------------------------');
    if (err) {
        console.error(err);
        return;
    }
    console.log(result);
});
const file_reader = fs.createReadStream(file).pipe(upload_stream);


// Upload Image with Promise API
cloudinary.uploader.upload(file, options).then(image => {
    console.log('Upload Image with Promise API');
    console.log('----------------------------------');
    console.log(image);
}).catch(err => {
    console.error(err);
});

// Upload Image with specified public id
const options_public_id = Object.assign({
    public_id: 'unique_id'
}, options);
cloudinary.uploader.upload(file, options_public_id).then(image => {
    console.log('Upload Image with specified public id');
    console.log('----------------------------------');
    console.log(image);
}).catch(err => {
    console.error(err);
});


// Upload Image with eager transformations
const eager_options = {
    width: 64,
    height: 64,
    crop: 'scale',
    format: 'jpg'
};
const options_transformations = Object.assign({ eager: eager_options }, options);
cloudinary.uploader.upload(file, options_transformations).then(image => {
    console.log('Upload Image with eager transformations');
    console.log('----------------------------------');
    console.log(image);
}).catch(err => {
    console.error(err);
});