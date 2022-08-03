import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private userService: UsersService,
  ) {}

  async list(): Promise<TaskDto[]> {
    return await this.taskRepository.find({
      select: ['createdDate', 'description', 'id', 'title', 'updatedDate'],
    });
  }
  async getById(id: number): Promise<TaskDto> {
    const result = await this.taskRepository.findOne({
      where: { id: id },
      select: [
        'createdDate',
        'description',
        'id',
        'title',
        'updatedDate',
        'assignees',
      ],
      relations: ['assignees'],
    });

    result.assignees = result.assignees.map((user) => {
      return {
        ...user,
        password: undefined,
        email: undefined,
      };
    });

    return result;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskDto> {
    if (!updateTaskDto.title) throw new Error('Başlık boş bırakılamaz');

    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['assignees'],
    });

    if (!task) throw new Error('Kayıt bulunamadı');

    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    const users = await this.userService.listByIds(updateTaskDto.assignees);
    task.assignees = users;
    task.updatedDate = new Date();

    await this.taskRepository.save(task);

    return this.getById(id);
  }

  async create(createTaskDto: CreateTaskDto): Promise<boolean> {
    const users = await this.userService.listByIds(createTaskDto.assignees);

    const task = await this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      assignees: users,
      createdDate: new Date(),
      updatedDate: null,
    });

    await this.taskRepository.save(task);
    return true;
  }
}
