const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const Extrs = require('./models/extrs')
const Users = require('./models/users')
const cors= require('cors')
const db = mongoose.connection
const extrsData = require('./utilities/exdata')
const usersData = require('./utilities/userdata')
const extrsControllers = require('./controllers/extrs')
const userControllers = require('./controllers/user')

// Environmental Varibles
const app = express()
const mongoURI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001

// Connecting to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true},
   () => console.log('MongoDB connection establish') )

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
//app.use(cors())
app.use(cors({ origin: '*' })) // used to whitelist requests
// Routes
app.use('/extrs',extrsControllers)
app.use('/users', userControllers);

// Seeding the db
app.get('/seed', async (req, res) => {
    await Extrs.deleteMany({});
    await Extrs.insertMany(extrsData);
    res.send('done!');
  });
  app.get('/seed2', async (req, res) => {
    await Users.deleteMany({});
    await Users.insertMany(usersData);
    res.send('done!');
  });

app.listen(PORT, () => {
    console.log('This message means nothing', PORT)
  })












