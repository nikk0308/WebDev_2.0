// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { VenueModule } from './venue/venue.module';
import { BookingModule } from './booking/booking.module';
import { PostModule } from './post/post.module';
import { ImageProcessingModule } from './image-processing/image-processing.module';
import { Venue } from './venue/venue.entity';
import { Booking } from './booking/booking.entity';
import { Post } from './post/post.entity';
import { AvailableSlot } from './venue/available-slot.entity';
import { Comment } from './post/comment.entity';
import { Like } from './post/like.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mydb',
      entities: [User, Venue, Booking, Post, AvailableSlot, Comment, Like],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Venue, Booking, AvailableSlot]),
    VenueModule,
    BookingModule,
    PostModule,
    ImageProcessingModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}