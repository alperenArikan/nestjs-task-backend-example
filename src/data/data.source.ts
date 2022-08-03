import 'reflect-metadata';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'yk9uadxxqn.',
  database: 'taskDb',
  synchronize: true,
  entities: [Task, User],
  migrationsTableName: 'taskdb_migrations',
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
});

if (AppDataSource.isInitialized) AppDataSource.initialize();
