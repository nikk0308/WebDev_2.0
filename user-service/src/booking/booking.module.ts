import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { User } from '../user.entity';
import { Venue } from '../venue/venue.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Booking, User, Venue]),
    ],
    controllers: [BookingController],
    providers: [BookingService],
})
export class BookingModule {}