require('dotenv').config();
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'mdr',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Perform the request outside of the lambda function for caching
const cloudinaryRequest = new Promise((resolve, reject) => {
  cloudinary.v2.api.resources((error, result) => {
    if(error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

const headers = {
  'Access-Control-Allow-Headers': 'Content-Type',
};

if (process.env.NODE_ENV != 'development') {
  headers['Access-Control-Allow-Origin'] = '*';
}

exports.handler = function(event, context, callback) {
  cloudinaryRequest.then((result) => {
    callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    });
  }).catch((error) => {
    callback(null, {
      statusCode: 500,
      headers,
      body: {
        error: {
          message: 'There was an issue when retrieving results from Cloudinary.',
        },
      },
    });
  });
};
