import { Schema, model, Document } from 'mongoose';

export interface IPriceHistory extends Document {
  coinId: string;
  prices: {
    date: Date;
    price: number;
  }[];
}

const priceEntrySchema = new Schema({
  date: { type: Date, required: true },
  price: { type: Number, required: true },
});

const priceHistorySchema = new Schema<IPriceHistory>({
  coinId: { type: String, required: true, unique: true },
  prices: [priceEntrySchema],
});

const PriceHistory = model<IPriceHistory>('PriceHistory', priceHistorySchema);

export default PriceHistory;
