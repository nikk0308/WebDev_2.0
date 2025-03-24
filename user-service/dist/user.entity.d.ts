import { Booking } from './booking/booking.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    bookings: Booking[];
}
