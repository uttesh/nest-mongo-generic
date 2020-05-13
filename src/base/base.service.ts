import { BadGatewayException, Injectable } from '@nestjs/common';
import { IBaseService } from '../base/IBase.service';
import { BaseEntity } from './base.entity';
import { Model } from 'mongoose';

@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T> {
	
	constructor(private readonly basemodule: Model<T>) { }

	async findAll(): Promise<T[]> {
	 try{
		return this.basemodule.find().exec();
	 } catch (error) {
			throw new BadGatewayException(error);
		}
	}
	async get(id: number): Promise<T> {
		try{
			const customer = await this.basemodule.findById(id).exec();
			return customer;
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
	async update(entity: T): Promise<T> {
		const updatedCustomer = await this.basemodule
			.findByIdAndUpdate(entity._id, entity, { new: true });
		return updatedCustomer;
	}
	async delete(id: number) {
		try{
			const deletedCustomer = await this.basemodule.findByIdAndRemove(id);
			return deletedCustomer;
		}catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async create(t: T): Promise<T> {
		try {
			const createdEntity = new this.basemodule(t);
			return createdEntity.save();
		}
		catch (error) {
			throw new BadGatewayException(error);
		}
	}

}