const mongoose = require('./db');
const Hotel = require('./models/Hotel');
const About = require('./models/About');
const hotelsData = require('./data/hotels');

// Default "about" data since about.js is empty
const defaultAboutData = {
  title: "About Us",
  description: "Welcome to our travel platform! We specialize in offering unforgettable experiences and hotel stays around the world.",
  mission: "Our mission is to make travel accessible, enjoyable, and memorable for everyone."
};

async function migrateData() {
  try {
    // Migrate hotels
    console.log('Hotels data to migrate:', hotelsData);
    await Hotel.deleteMany();
    console.log('Cleared existing hotels collection');
    await Hotel.insertMany(hotelsData);
    console.log('Hotels migrated successfully:', hotelsData.length, 'records inserted');

    // Migrate default about data
    console.log('Default about data to migrate:', defaultAboutData);
    await About.deleteMany();
    console.log('Cleared existing abouts collection');
    await About.insertMany([defaultAboutData]);
    console.log('About data migrated successfully: 1 record inserted');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    mongoose.connection.close();
  }
}

migrateData();