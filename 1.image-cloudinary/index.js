require('dotenv').config();
const cloudinary = require('cloudinary');
const Sharp = require('sharp');

cloudinary.config({
    cloud_name: process.env.IMG_CLOUDINARY_AC,
    api_key: process.env.IMG_CLOUDINARY_API_KEY,
    api_secret: process.env.IMG_CLOUDINARY_API_SEC
});

// cloudinary.uploader.upload('', (result) => {
//     console.log(result);
// });

// Sharp('./../images/lena.png')
//     .toBuffer()
//     .then(buffer => {
//         cloudinary.uploader.upload('', {}, (error, result) => {
//             console.log(error);
//             console.log(result);
//         });
//     })
//     .catch(err => console.log(err));



cloudinary.uploader.upload('./../assets/images/lena.png',
    (result) => {
        console.log(result);
    }, { width: 800, height: 600, crop: "limit" }
);