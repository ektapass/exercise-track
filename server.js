const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const Extrs = require('./models/extrs')
const cors= require('cors')
const db = mongoose.connection
const extrsData = require('./utilities/data')
const extrsControllers = require('./controllers/extrs')

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
app.use(cors())

// Routes
app.use('/extrs',extrsControllers)//telling server.js to get the routes from controllers/todos
// app.get('/todos', (req,res) => {
//     Todos.find({}, (err, foundTodos) =>{
//         res.json(foundTodos)
//     })
// })

// Seeding the db
app.get('/seed', async (req, res) => {
    await Extrs.deleteMany({});
    await Extrs.insertMany(extrsData);
    res.send('done!');
  });

app.listen(PORT, () => {
    console.log('This message means nothing', PORT)
  })












