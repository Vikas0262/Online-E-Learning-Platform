const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: [
    'https://online-learning-platform-vikas.vercel.app',
    'http://127.0.0.1:5500',
    'http://localhost:5500'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.log('❌ DB error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/courses', courseRoutes);

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
