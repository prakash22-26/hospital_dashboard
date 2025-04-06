const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Add this line
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve(); // Get the current directory name

// Middleware
app.use(cors()); 
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://auth-db:Prakash123@cluster0.bsnm8.mongodb.net/doctorapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/doctor', require('./routes/doctor'));
app.use('/api/patient', require('./routes/patient'));

app.use(express.static(path.join(_dirname, '/frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, 'frontend', 'build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
