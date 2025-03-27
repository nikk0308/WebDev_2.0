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
import { VenueService } from './venue/venue.service';
import { VenueController } from './venue/venue.controller';
import { BookingService } from './booking/booking.service';
import { BookingController } from './booking/booking.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mydb',
      entities: [User, Venue, Booking, Post, AvailableSlot, Comment, Like],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Venue, Booking,AvailableSlot]),
    VenueModule,
    BookingModule,
    PostModule,
    ImageProcessingModule,
  ],
  controllers: [UsersController, VenueController,BookingController],
  providers: [UsersService, VenueService,BookingService],
})
export class AppModule {}