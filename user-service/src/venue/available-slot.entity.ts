import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Venue } from './venue.entity';

@Entity()
export class AvailableSlot {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Venue, venue => venue.slots)
    venue!: Venue;

    @Column()
    start_time!: Date;

    @Column()
    end_time!: Date;

    @Column({ default: true })
    is_available!: boolean;
}