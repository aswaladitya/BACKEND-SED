const mongoose = require('mongoose');
const About = require('./models/About');

async function seedAboutData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/backend-sed', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await About.deleteMany({});
    await About.create({
      title: "About Our Travel Agency",
      description: "We are a dedicated team passionate about creating unforgettable travel experiences. With over a decade of expertise in the travel industry, we specialize in curating personalized journeys to destinations around the globe. Our team is committed to ensuring that every trip is tailored to your preferences, whether you're seeking adventure, relaxation, or cultural immersion. We work with trusted partners worldwide to provide seamless travel experiences, from booking flights and accommodations to arranging guided tours and unique activities. Let us help you explore the world and create memories that will last a lifetime.",
      descriptionTeaser: "Passionate about travel, we curate personalized journeys worldwide.",
      mission: "Our mission is to inspire wanderlust and provide seamless travel experiences that leave lasting memories for our clients. We aim to empower travelers to explore the world with confidence, offering expert guidance and support every step of the way. By focusing on sustainability and cultural respect, we ensure that your travels not only enrich your life but also contribute positively to the destinations you visit. Join us on a journey of discovery and let us make your travel dreams a reality.",
      missionTeaser: "Inspiring wanderlust with seamless, sustainable travel experiences.",
    });

    console.log("About data seeded successfully");
  } catch (err) {
    console.error("Error seeding about data:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedAboutData();