import { Repository } from 'typeorm';
import { Venue } from './venue.entity';
import { AvailableSlot } from './available-slot.entity';
export declare class VenueService {
    private readonly venueRepository;
    private readonly slotRepository;
    constructor(venueRepository: Repository<Venue>, slotRepository: Repository<AvailableSlot>);
    create(createVenueDto: any): Promise<Venue[]>;
    findAll(): Promise<Venue[]>;
    findSlots(id: string): Promise<AvailableSlot[]>;
}
