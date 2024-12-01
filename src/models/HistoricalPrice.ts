import { Schema, model, Document } from 'mongoose';

export interface IHistoricalPrice extends Document {
  coinId: string;
  prices: [number, number][]; // [ [timestamp, price], ... ]
}

const historicalPriceSchema = new Schema<IHistoricalPrice>({
  coinId: { type: String, required: true, unique: true },
  prices: { type: [[Number]], default: [] },
});

historicalPriceSchema.index({ coinId: 1 });

const HistoricalPrice = model<IHistoricalPrice>(
  'HistoricalPrice',
  historicalPriceSchema
);

export default HistoricalPrice;
