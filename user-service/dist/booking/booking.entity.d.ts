import { User } from '../user.entity';
import { Venue } from '../venue/venue.entity';
export declare class Booking {
    id: string;
    user: User;
    venue: Venue;
    start_time: Date;
    end_time: Date;
    status: string;
    created_at: Date;
}
