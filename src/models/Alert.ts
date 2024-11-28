import { Schema, model, Document, Types } from 'mongoose';

export interface IAlert extends Document {
  userId: Types.ObjectId;
  coinId: string;
  targetPrice: number;
  direction: 'above' | 'below';
  createdAt: Date;
  updatedAt: Date;
}

const alertSchema = new Schema<IAlert>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coinId: {
      type: String,
      required: true,
    },
    targetPrice: {
      type: Number,
      required: true,
    },
    direction: {
      type: String,
      enum: ['above', 'below'],
      required: true,
    },
  },
  { timestamps: true }
);

const Alert = model<IAlert>('Alert', alertSchema);

export default Alert;