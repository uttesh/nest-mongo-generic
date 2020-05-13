import { Schema } from "mongoose";
import { BaseEntity } from "src/base/base.entity";


export const UserSchema = new Schema({
  name: String,
  age: Number,
  created_at: Date
});

export interface User extends BaseEntity {
  readonly name: string;
  readonly age: number;
  readonly created_at: Date;
}