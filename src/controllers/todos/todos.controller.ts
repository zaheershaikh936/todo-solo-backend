import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
// import { Types } from 'mongoose';

@Controller('todo')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Res() response) {
    try {
      const userId = response.locals.userInfo.data;
      createTodoDto.userId = userId.id;
      const data = await this.todoService.create(createTodoDto);
      return response
        .status(200)
        .json({ data, message: 'Todo created successfully.' });
    } catch (error) {
      return response
        .status(500)
        .json({ error, message: 'Failed to create todo.' });
    }
  }
  @Get()
  async findAll(@Res() response) {
    try {
      const userId = response.locals.userInfo.data;
      const data = await this.todoService.findAll(userId.id);
      return response
        .status(200)
        .json({ data, message: "Todo's find successfully." });
    } catch (error) {
      return response
        .status(500)
        .json({ error, message: "Failed to get todo's find." });
    }
  }

  @Get('tag-count')
  async findAllTagCount(@Res() response) {
    try {
      const userId = response.locals.userInfo.data;
      const data = await this.todoService.findAllTagCount(userId.id);
      return response
        .status(200)
        .json({ data, message: "Tags todo's find successfully." });
    } catch (error) {
      return response
        .status(500)
        .json({ error, message: "Failed to get tags todo's find." });
    }
  }

  @Get('favorites')
  async findAllFavorites(@Res() response) {
    try {
      const userId = response.locals.userInfo.data;
      const data = await this.todoService.findAllFavorites(userId.id);
      return response
        .status(200)
        .json({ data, message: "Favorites todo's find successfully." });
    } catch (error) {
      return response
        .status(500)
        .json({ error, message: "Failed to get favorites todo's find." });
    }
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.todoService.remove(id);
  }

  @Patch()
  update(@Query('id') id: string, @Query('like') like: boolean) {
    return this.todoService.update(id, like);
  }
}
