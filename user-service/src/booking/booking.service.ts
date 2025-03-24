// src/booking/booking.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { User } from '../user.entity';
import { Venue } from '../venue/venue.entity';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Venue)
        private readonly venueRepository: Repository<Venue>,
    ) {}

    async create(createBookingDto: CreateBookingDto) {
        const user = await this.userRepository.findOneBy({ id: createBookingDto.user_id });
        if (!user) {
            throw new NotFoundException('Користувач не знайдений');
        }

        const venue = await this.venueRepository.findOneBy({ id: createBookingDto.venue_id });
        if (!venue) {
            throw new NotFoundException('Стадіон не знайдений');
        }

        const booking = this.bookingRepository.create({
            ...createBookingDto,
            user,
            venue,
        });

        return this.bookingRepository.save(booking);
    }

    async findByUser(user_id: string) {
        return this.bookingRepository.find({ where: { user: { id: user_id } }, relations: ['venue'] });
    }

    async cancel(bookingId: string) {
        await this.bookingRepository.update(bookingId, { status: 'cancelled' });
    }
}