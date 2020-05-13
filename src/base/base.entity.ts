import { Document } from "mongoose";

export interface BaseEntity extends Document {
    created_on: Date;
    updated_on: Date;
    created_by: String;
    updated_by: String;
}