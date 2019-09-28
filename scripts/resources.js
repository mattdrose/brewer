require('dotenv').config()
const cloudinary = require('cloudinary')
const _ = require('lodash')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mdr',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

function resources () {
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

async function images () {
  return resources().then((data) => data.map((image) => ({
    title: _.get(image, 'context.custom.caption') || '',
    contribution: _.get(image, 'context.custom.contribution') || '',
    alt: _.get(image, 'context.custom.alt') || '',
    format: image.format,
    sizes: [400, 600, 800, 1000, 1200, 1400].reduce((acc, width) => {
      acc[`${width}w`] = cloudinary.url(image.public_id, {
        secure: true,
        width
      })
      return acc
    }, {})
  })))
}

module.exports = { images }
