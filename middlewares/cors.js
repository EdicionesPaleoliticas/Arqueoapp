// middlewares/cors.js
import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'http://localhost:5500',
  'http://localhost:1234',
  'http://localhost:8080',
  `http://localhost:${process.env.PORT}`,
  'https://arqueoapp.onrender.com/',
  "https://arqueoapp.onrender/sitios"
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin) || !origin) {
      return callback(null, true);
    }
    return callback(new Error('NO LO PERMITE CORS!!!'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});
