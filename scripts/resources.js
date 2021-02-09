require('dotenv').config()
const cloudinary = require('cloudinary')
const _ = require('lodash')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mdr',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

function cloudinaryVideos () {
  return new Promise((resolve, reject) => {
    cloudinary.v2.api.resources({
      type: 'upload',
      prefix: 'brewer',
      context: true,
      max_results: 500,
      resource_type: 'video'
    }, (error, result) => {
      if (error || !result.resources) {
        reject(error)
      } else {
        resolve(result.resources)
      }
    })
  })
}

function cloudinaryImages () {
  return new Promise((resolve, reject) => {
    cloudinary.v2.api.resources({
      type: 'upload',
      prefix: 'brewer',
      context: true,
      max_results: 500
    }, (error, result) => {
      if (error || !result.resources) {
        reject(error)
      } else {
        resolve(result.resources)
      }
    })
  })
}

async function assets () {
  return Promise.all([
    cloudinaryImages(),
    cloudinaryVideos()
  ]).then((values) => {
    const imageArray = values[0];
    const videoArray = values[1];
    const combinedArray = imageArray.concat(videoArray);
    const sortedValues = combinedArray.sort((a, b) => (a.public_id > b.public_id) ? 1 : -1)
    return sortedValues.map((asset) => ({
      title: _.get(asset, 'context.custom.caption') || '',
      contribution: _.get(asset, 'context.custom.contribution') || '',
      alt: _.get(asset, 'context.custom.alt') || '',
      format: asset.format,
      isVideo: asset.format === 'mp4',
      sizes: [400, 600, 800, 1000, 1200, 1400].reduce((acc, width) => {
        acc[`${width}w`] = cloudinary.url(asset.public_id, {
          secure: true,
          width,
          resource_type: asset.format === 'mp4' ? 'video' : 'image'
        })
        return acc
      }, {})
    }))
  })
}

module.exports = { assets }
