import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { CreateUserTable1741898667622 } from './migrations/1741898667622-CreateUserTable';
import { CreateVenuesAndBookings1742414729093 } from './migrations/1742414729093-CreateVenuesAndBookings';
import { CreateBookingTable1742646024196 } from './migrations/1742646024196-CreateBookingTable';
import {Venue} from "./venue/venue.entity";
import { Booking } from './booking/booking.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mydb',
  entities: [User,Venue,Booking],
  migrations: [CreateUserTable1741898667622, CreateVenuesAndBookings1742414729093,CreateBookingTable1742646024196],
  synchronize: false,
  migrationsRun: true,
  logging: true,
});