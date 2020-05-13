import { Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { IBaseService } from './IBase.service'
import { BaseEntity } from './base.entity';

export class BaseController<T extends BaseEntity> {

  constructor(private readonly baseService: IBaseService<T>) {}
  
  @Get()
  async getAll(@Res() res) {
      const entities = await this.baseService.findAll();
      return res.status(HttpStatus.OK).json(entities);
  }

  @Get(':id')
  async getCustomer(@Res() res, @Param('id') id) {
      const entity = await this.baseService.get(id);
      if (!entity){
        throw new NotFoundException('Entity does not exist!');
      }
      return res.status(HttpStatus.OK).json(entity);

  }

  @Post()
  async add(@Res() res, @Body() t: T) {
      const updatedEntity = await this.baseService.create(t);
      return res.status(HttpStatus.OK).json({
          message: 'Entity has been created successfully',
          updatedEntity
      });
  }

  @Put(':id')
  async update(@Res() res, @Query('id') id, @Body() t: T) {
      const entity = await this.baseService.update(t);
      if (!entity) {
        throw new NotFoundException('Entity does not exist!');
      } 
      return res.status(HttpStatus.OK).json({
          message: 'Entity has been successfully updated',
          entity
      });
  }

  @Delete(':id')
  async deleteCustomer(@Res() res, @Query('id') id) {
      const entity = await this.baseService.delete(id);
      if (!entity) {
        throw new NotFoundException('Entity does not exist');
      }
      return res.status(HttpStatus.OK).json({
          message: 'Entity has been deleted',
          entity
      })
  }
}