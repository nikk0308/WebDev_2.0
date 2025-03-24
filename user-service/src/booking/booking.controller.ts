import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Post()
    create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingService.create(createBookingDto);
    }

    @Get(':user_id')
    findByUser(@Param('user_id') user_id: string) {
        return this.bookingService.findByUser(user_id);
    }

    @Delete(':bookingId')
    cancel(@Param('bookingId') bookingId: string) {
        return this.bookingService.cancel(bookingId);
    }
}