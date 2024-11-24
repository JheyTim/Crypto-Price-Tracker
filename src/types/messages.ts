export interface PriceUpdateMessage {
  type: 'PRICE_UPDATE';
  data: {
    [key: string]: {
      [currency: string]: number;
    };
  };
}

export type WebSocketMessage = PriceUpdateMessage; // Extend with other message types as needed
