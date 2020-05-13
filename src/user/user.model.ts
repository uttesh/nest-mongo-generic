import { Document, Schema } from "mongoose";


export const UserSchema = new Schema({
  name: String,
  age: Number,
  created_at: Date
});

export interface User extends Document {
  readonly name: string;
  readonly age: number;
  readonly created_at: Date;
}