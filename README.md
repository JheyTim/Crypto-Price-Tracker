# Cryptocurrency Price Tracker
## Overview
An advanced cryptocurrency price tracking application that provides real-time updates, portfolio management, price alerts, and historical data analysis. Built with TypeScript, Node.js, Express, and MongoDB, this backend application offers a robust RESTful API for interacting with cryptocurrency data.

## Features
* **Real-Time Price Updates**: Receive live cryptocurrency prices using WebSockets.
* **Portfolio Management**: Add, remove, and update your cryptocurrency holdings.
* **Price Alerts**: Set alerts to be notified when a cryptocurrency reaches a certain price.
* **Historical Data Collection**: Collect and store historical price data for analysis.
* **Financial Indicators:**: Calculate moving averages and volatility for cryptocurrencies.
* **User Authentication**: Secure registration and login with JWT authentication.
* **RESTful API**: Well-structured API endpoints following REST principles.
 
## Tech Stack
* **Backend Framework**: Node.js with Express.js
* **Language**: TypeScript
* **Database**: MongoDB with Mongoose ODM
* **WebSockets**: ws library for real-time communication
* **Scheduling**: node-cron for scheduled tasks
* **Authentication**: JSON Web Tokens (JWT)
* **Logging**: winston for logging

## Prerequisites
Make sure you have the following installed on your system:

* **Node.js** (v12 or higher)
* **MongoDB** (local instance or cloud-based MongoDB)
* **TypeScript**: Installed globally (npm install -g typescript)

### Installation
1. Clone the repository:
   ```bash
   https://github.com/JheyTim/Crypto-Price-Tracker.git
   cd Crypto-Price-Tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables. Create a .env file in the root directory and add the following:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/crypto-price-tracker
   JWT_SECRET=my-jwt-secret
   ```
4. Start the application:
   ```bash
   npm run dev
   ```
## License
This project is licensed under the [MIT License](LICENSE).
