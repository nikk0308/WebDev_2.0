import { Venue } from './venue.entity';
export declare class AvailableSlot {
    id: string;
    venue: Venue;
    start_time: Date;
    end_time: Date;
    is_available: boolean;
}
