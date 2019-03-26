# Brewer

Brewer is an extremely lightweight portfolio website. It focuses on speed by using zero dependencies, inline styling, Cloudinary hosted assets, and Netlify deploys.

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

![Screen shot](https://i.imgur.com/0kC1JPC.jpg)
