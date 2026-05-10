const required = ['PORT', 'MONGODB_URI', 'OPENWEATHER_API_KEY', 'CLIENT_ORIGIN'];
const validateEnv = () => {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}. Check your .env file.`);
  }
};
module.exports = { validateEnv };
