import WebSocket, { Server } from 'ws';
import { Server as HttpServer } from 'http';
import { WebSocketMessage } from './types/messages';
import logger from './utils/logger';

interface WebSocketWithId extends WebSocket {
  id?: string;
}

class WebSocketServer {
  private wss: Server;
  private clients: Set<WebSocketWithId>;

  constructor(server: HttpServer) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Set();

    this.wss.on('connection', (ws: WebSocketWithId) => {
      logger.info('Client connected');
      this.clients.add(ws);

      ws.on('message', (message: string) => {
        logger.info(`Received message => ${message}`);
        // Handle incoming messages if needed
      });

      ws.on('close', () => {
        logger.info('Client disconnected');
        this.clients.delete(ws);
      });

      ws.on('error', (error) => {
        logger.error(`WebSocket error: ${error}`);
      });
    });
  }

  public broadcast(data: WebSocketMessage) {
    const message = JSON.stringify(data);
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
}

export default WebSocketServer;
