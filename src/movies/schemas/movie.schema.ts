import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Movie extends Document {
  name: string;
  genre: string;
  release_date: Date;
  up_votes: number;
  down_votes: number;
  reviews: Array<string>;
}
export const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  release_date: { type: Date, required: true },
  up_votes: { type: String, required: true, default: 0 },
  down_votes: { type: String, required: true, default: 0 },
  reviews: { type: Array, required: true },
});
