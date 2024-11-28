import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import WebSocketServer from './websocketServer';
import PriceUpdater from './schedulers/priceUpdater';
import userRoutes from './routes/userRoutes';
import alertRoutes from './routes/alertRoutes';
import portfolioRoutes from './routes/portfolioRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Cryptocurrency Price Tracker API is running.');
});

app.use('/api/users', userRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/portfolio', portfolioRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Create HTTP server and integrate with Express
const server = http.createServer(app);

// Initialize WebSocket Server
const wsServer = new WebSocketServer(server);

// After initializing the WebSocket server
const priceUpdater = new PriceUpdater(wsServer);
priceUpdater.start();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
