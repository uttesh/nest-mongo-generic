import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async update(id, user: User): Promise<User> {
    const updatedCustomer = await this.userModel
        .findByIdAndUpdate(id, user, { new: true });
    return updatedCustomer;
  }

  async delete(id): Promise<any> {
    const deletedCustomer = await this.userModel.findByIdAndRemove(id);
    return deletedCustomer;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async get(id): Promise<User> {
      const customer = await this.userModel.findById(id).exec();
      return customer;
  }
}
