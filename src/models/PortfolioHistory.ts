import { Schema, model, Document, Types } from 'mongoose';

export interface IPortfolioHistory extends Document {
  userId: Types.ObjectId;
  date: Date;
  totalValue: number;
  holdings: {
    coindId: string;
    amount: number;
    value: number;
  }[];
}

const portfolioHistorySchema = new Schema<IPortfolioHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  totalValue: {
    type: Number,
    required: true,
  },
  holdings: [
    {
      coinId: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
});

const PortfolioHistory = model<IPortfolioHistory>(
  'PortfolioHistory',
  portfolioHistorySchema
);

export default PortfolioHistory;
