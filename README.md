# Brewer

Brewer is an extremely lightweight portfolio website. It focuses on speed by using zero dependencies, inline styling, [Cloudinary](https://cloudinary.com) hosted assets, and [Netlify](https://netlify.com) deploys.

[See how the speed compares.](#performance-data)

## Local development

You can configure this website by creating a Cloudinary account and adding a `.env` file with your API credentials:

```
CLOUDINARY_CLOUD_NAME=XXXX
CLOUDINARY_API_KEY=XXXX
CLOUDINARY_API_SECRET=XXXX
```

On build, the resources script will automatically pull all the images in a Cloudinary folder called `brewer/`.

You can build using yarn:

```bash
yarn install # Install build dependencies
yarn dev
```

This will create a local webpack server that you can access at `localhost:8080/`.

## Deployment

You can deploy this website by connecting your Github account to netlify.com. You'll need to add your production `.env` variables through their GUI. All other neccessary configurations already exist in `netlify.toml`.

## Image meta data

Once you've uploaded an image on Cloudinary, you can add the neccessary meta data which will be populated on the front-end.

After opening the image, click on `Edit meta data` and add fields and content for `alt`, `contribution`, and `title`.

<img src="https://i.imgur.com/0kC1JPC.jpg" alt="Cloudinary screenshot" width="400"/>

## Performance data

These are the results of a [Webpage Speed Test](https://www.webpagetest.org/video/compare.php?tests=190326_SH_06e74586cc5a9ea35c4ddc3a924dda71,190326_77_f0a8a2c6737bed53d390b8b010afa397,190326_64_9ad4188bbcc337c9bafa0cf3becd9366,190326_W8_a4ded0d60680b2a99d403187f73074d7,190326_SQ_beab894590a48bfed0a77bbf3f2b0b93) against some popular portfolio websites (Wix, Squarespace, Awwward winners)

Note: This doesn't use a large sample dataset. The compared websites were found on featured portfolio pages and selected based on similar functionality and design. Outside of that, the selection was completely random.

<img src="https://i.imgur.com/fnic2rY.jpg" alt="Visual progress"/>

<img src="https://i.imgur.com/6WvEQ91.jpg" alt="Visually complete"/>

<img src="https://i.imgur.com/MftKqxY.jpg" alt="Speed index"/>

<img src="https://i.imgur.com/B60Bico.jpg" alt="First meaningful paint"/>
