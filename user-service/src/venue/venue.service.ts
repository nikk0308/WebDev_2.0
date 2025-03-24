import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from './venue.entity';
import { AvailableSlot } from './available-slot.entity';
import { CreateVenueDto } from './dto/create-venue.dto';


@Injectable()
export class VenueService {
    constructor(
        @InjectRepository(Venue)
        private readonly venueRepository: Repository<Venue>,
        @InjectRepository(AvailableSlot)
        private readonly slotRepository: Repository<AvailableSlot>,
    ) {}

    async create(createVenueDto: any) {
        const venue = this.venueRepository.create(createVenueDto);
        return this.venueRepository.save(venue);
    }

    findAll() {
        return this.venueRepository.find();
    }

    findSlots(id: string) {
        return this.slotRepository.find({ where: { venue: { id } } });
    }
}
