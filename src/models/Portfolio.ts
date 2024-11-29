import { Schema, model, Document, Types } from 'mongoose';

export interface IPortfolioItem {
  coinId: string;
  amount: number;
  averageBuyPrice: number;
}

export interface IPortfolio extends Document {
  userId: Types.ObjectId;
  holdings: IPortfolioItem[];
  createdAt: Date;
  updatedAt: Date;
}

const portfolioItemSchema = new Schema<IPortfolioItem>({
  coinId: { type: String, required: true },
  amount: { type: Number, required: true },
  averageBuyPrice: { type: Number, required: true },
});

const portfolioSchema = new Schema<IPortfolio>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    holdings: [portfolioItemSchema],
  },
  { timestamps: true }
);

const Portfolio = model<IPortfolio>('Portfolio', portfolioSchema);

export default Portfolio;
