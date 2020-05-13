import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/')
    async getAll(@Res() res) {
        const users = await this.userService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    async getCustomer(@Res() res, @Param('id') userid) {
        const user = await this.userService.get(userid);
        if (!user){
          throw new NotFoundException('User does not exist!');
        }
        return res.status(HttpStatus.OK).json(user);

    }

    @Post('/')
    async add(@Res() res, @Body() user: User) {
        const updatedUser = await this.userService.create(user);
        return res.status(HttpStatus.OK).json({
            message: 'User has been created successfully',
            updatedUser
        });
    }

    @Put('/')
    async update(@Res() res, @Query('id') id, @Body() user: User) {
        const customer = await this.userService.update(id, user);
        if (!customer) {
          throw new NotFoundException('User does not exist!');
        } 
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been successfully updated',
            customer
        });
    }

    // Delete a customer
    @Delete('/delete')
    async deleteCustomer(@Res() res, @Query('id') id) {
        const customer = await this.userService.delete(id);
        if (!customer) {
          throw new NotFoundException('User does not exist');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been deleted',
            customer
        })
    }
}