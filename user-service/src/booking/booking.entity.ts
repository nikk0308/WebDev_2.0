// src/booking/booking.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user.entity';
import { Venue } from '../venue/venue.entity';

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, user => user.bookings)
    user!: User; // Поле `user` повинно бути визначене

    @ManyToOne(() => Venue, venue => venue.id)
    venue!: Venue;

    @Column()
    start_time!: Date;

    @Column()
    end_time!: Date;

    @Column({ default: 'pending' })
    status!: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}