import { BasicUserDto } from 'src/users/dto/basicUser.dto';

export class TaskDto {
  id: number;
  title: string;
  description: string;
  assignees: BasicUserDto[] | null;
  createdDate: Date;
  updatedDate: Date;
}
