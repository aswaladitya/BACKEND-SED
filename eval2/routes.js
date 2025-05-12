const express = require('express');
const router = express.Router();
const Experience = require('./models/Experience');
const Hotel = require('./models/Hotel');
const User = require('./models/User');
const About = require('./models/About');


const pages = ['index', 'resorts', 'contact', 'dashboard', 'login'];

pages.forEach(page => {
  router.get(`/${page === 'index' ? '' : page}`, (req, res) =>
    res.render(page)
  );
});


router.get('/about', async (req, res) => {
  try {
    const about = await About.findOne();
    console.log('About data fetched for /about:', about);
    if (about) {
      res.render('about', { about });
    } else {
      res.status(404).send("About information not found");
    }
  } catch (err) {
    console.error('Error fetching about data:', err); // Log the full error
    res.status(500).send('Error fetching about data');
  }
});

// Get all experiences (API route)
router.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Render the experience page with all hotels
router.get('/experience', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.render('experience', { hotels });
  } catch (err) {
    res.status(500).send('Error fetching hotels');
  }
});

// Render a specific experience page by slug (link field)
router.get('/experience/:slug', async (req, res) => {
  const slug = req.params.slug;
  try {
    const experience = await Hotel.findOne({ link: `/experience/${slug}` });
    if (experience) {
      res.render('eachExperience', { experience });
    } else {
      res.status(404).send("Experience not found");
    }
  } catch (err) {
    res.status(500).send('Error fetching experience');
  }
});

// Get all hotels (API route)
router.get('/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new experience (API route)
router.post('/experiences', async (req, res) => {
  const experience = new Experience({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    rating: req.body.rating
  });
  try {
    const newExperience = await experience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a new hotel (API route)
router.post('/hotels', async (req, res) => {
  const hotel = new Hotel({
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating,
    image: req.body.image,
    link: req.body.link
  });
  try {
    const newHotel = await hotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      return res.status(302).redirect('/?login=true');
    } else {
      return res.redirect('/?login=false');
    }
  } catch (err) {
    res.redirect('/login?error=server');
  }
});

// Handle registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.redirect('/?reg=false&error=user_exists');
    }
    const user = new User({ username, password });
    await user.save();
    return res.status(302).redirect('/?reg=true');
  } catch (err) {
    res.status(500).json({ error: 'Error saving registration data' });
  }
});

// Crash route for testing error handling
router.get('/crash', (req, res, next) => {
  throw new Error('Oops! Something broke.');
});

module.exports = router;