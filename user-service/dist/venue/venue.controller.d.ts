import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
export declare class VenueController {
    private readonly venueService;
    constructor(venueService: VenueService);
    create(createVenueDto: CreateVenueDto): Promise<import("./venue.entity").Venue[]>;
    findAll(): Promise<import("./venue.entity").Venue[]>;
    findSlots(id: string): Promise<import("./available-slot.entity").AvailableSlot[]>;
}
