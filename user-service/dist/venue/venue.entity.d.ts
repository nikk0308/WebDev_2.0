import { AvailableSlot } from './available-slot.entity';
export declare class Venue {
    id: string;
    name: string;
    location: string;
    type: string;
    description?: string;
    slots: AvailableSlot[];
}
