import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { User } from '../user.entity';
import { Venue } from '../venue/venue.entity';
export declare class BookingService {
    private readonly bookingRepository;
    private readonly userRepository;
    private readonly venueRepository;
    constructor(bookingRepository: Repository<Booking>, userRepository: Repository<User>, venueRepository: Repository<Venue>);
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    findByUser(user_id: string): Promise<Booking[]>;
    cancel(bookingId: string): Promise<void>;
}
