import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from '../todos/entities/todo.entity';
import { Model } from 'mongoose';
import { HttpCodes } from '../../utils/response-formatter';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private TodoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoDocument> {
    return await new this.TodoModel(createTodoDto).save();
  }

  async findAll(id: string) {
    return await this.TodoModel.find({ userId: id });
  }

  async remove(id: string) {
    const data = await this.TodoModel.deleteOne({ _id: id });
    return {
      data,
      message: 'Todo delete successfully.',
      status: HttpCodes.SUCCESS,
    };
  }

  async update(id: string, like: boolean) {
    const data = await this.TodoModel.updateOne({ _id: id }, { like: like });
    return {
      data,
      message: 'Todo update successfully.',
      status: HttpCodes.SUCCESS,
    };
  }

  async findAllTagCount(id: string) {
    const important = await this.TodoModel.count({
      userId: id,
      type: 'important',
    });
    const Non_important = await this.TodoModel.count({
      userId: id,
      type: 'non-important',
    });
    const later = await this.TodoModel.count({
      userId: id,
      type: 'later',
    });
    return { important, Non_important, later };
  }

  async findAllFavorites(id: string) {
    return await this.TodoModel.find({ userId: id, like: true });
  }
}
