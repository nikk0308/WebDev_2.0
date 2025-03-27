import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(createBookingDto: CreateBookingDto): Promise<import("./booking.entity").Booking>;
    findByUser(user_id: string): Promise<import("./booking.entity").Booking[]>;
    cancel(bookingId: string): Promise<void>;
}
