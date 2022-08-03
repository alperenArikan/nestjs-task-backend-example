import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  async list(): Promise<TaskDto[]> {
    return await this.tasksService.list();
  }
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<TaskDto> {
    return await this.tasksService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDto> {
    try {
      return await this.tasksService.update(id, updateTaskDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<boolean> {
    try {
      return await this.tasksService.create(createTaskDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
