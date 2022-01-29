import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  favouriteGenre: Array<string>;
}
export const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  favouriteGenre: { type: Array },
});

UserSchema.pre('save', async function (next: any) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
