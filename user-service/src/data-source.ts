import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { CreateUserTable1741898667622 } from './migrations/1741898667622-CreateUserTable';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mydb',
  entities: [User],
  migrations: [CreateUserTable1741898667622],
  synchronize: false,
});