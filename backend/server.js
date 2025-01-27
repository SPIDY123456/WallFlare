
const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const wallpaperRoutes = require('./routes/wallpaperRoutes');

connectDB();



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/wallpaper',wallpaperRoutes);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));