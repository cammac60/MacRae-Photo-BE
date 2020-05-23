const imageData = require('../../../data.js');

const fs = require('fs');

const base64Encode = file => {
    const bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
};

const readFile = async (link) => {
  try {
    const data = await base64Encode(`./images/main/${link}.JPG`);
    return data;
  } catch (err) {
      console.log(`Error reading file: ${err}`)
  }
};

const createImage = async (knex, image) => {
  try {
    const bin = await readFile(image.link);
    const imageID = await knex('images').insert({
      title: image.title,
      location: image.location,
      landscape: image.landscape,
      image: bin
    });
  } catch (error) {
      console.log(error);
  }
};

exports.seed = async (knex) => {
  try {
    await knex('images').del();
    let imagePromises = imageData.map( async (img) => {
      const image = await createImage(knex, img);
      return image;
    });
    return Promise.all(imagePromises);
  } catch (err) {
      console.log(`Error seeding data: ${err}`);
  }
};
