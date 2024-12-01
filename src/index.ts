import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import WebSocketServer from './websocketServer';
import PriceUpdater from './schedulers/priceUpdater';
import AlertChecker from './schedulers/alertChecker';
import PortfolioHistoryUpdater from './schedulers/portfolioHistoryUpdater';
import DataCollector from './schedulers/dataCollector';
import userRoutes from './routes/userRoutes';
import alertRoutes from './routes/alertRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import analysisRoutes from './routes/analysisRoutes';

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
app.use('/api/analysis', analysisRoutes);

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

const priceUpdater = new PriceUpdater(wsServer);
const alertChecker = new AlertChecker();
const portfolioHistoryUpdater = new PortfolioHistoryUpdater();
const dataCollector = new DataCollector();

dataCollector.start();
portfolioHistoryUpdater.start();
alertChecker.start();
priceUpdater.start();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
