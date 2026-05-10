require('dotenv').config();
const { validateEnv } = require('./config/env');
validateEnv();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weather');
const locationsRoutes = require('./routes/locations');
const settingsRoutes = require('./routes/settings');
const errorHandler = require('./middleware/errorHandler');
const app = express();
app.use(helmet());
app.use(cors({ origin: ['https://shehab-skycast.vercel.app', 'http://localhost:5173'], credentials: true }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);
app.use('/api/weather', weatherRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/settings', settingsRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'development') {
        process.stdout.write(`Server running on port ${PORT}\n`);
      }
    });
  })
  .catch((err) => {
    process.stderr.write(`Database connection failed: ${err.message}\n`);
    process.exit(1);
  });
