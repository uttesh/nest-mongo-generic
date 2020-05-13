import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { BaseController } from 'src/base/base.controller';

@Controller('user')
export class UserController extends BaseController<User> {
    constructor(private userService: UserService) {
        super(userService);
     }
}