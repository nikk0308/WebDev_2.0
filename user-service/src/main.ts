import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as amqp from 'amqplib';
import { UsersService } from './users.service';
import { VenueService } from './venue/venue.service';
import { BookingService } from './booking/booking.service';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const connection = await amqp.connect('amqp://rabbitmq:5672');
  const channel = await connection.createChannel();

  app.useGlobalPipes(new ValidationPipe());

  await channel.assertQueue('user_service_queue');
  await channel.assertQueue('response_queue');

  await app.listen(3000);

  channel.consume('user_service_queue', async (msg) => {
    if (msg) {
      try {
        const message = JSON.parse(msg.content.toString());
        if (message.action === 'register') {
          const user = await app.get(UsersService).register(message.data);
          channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(user)),
              { correlationId: msg.properties.correlationId }
          );
        }

        if (message.action === 'create_venue') {
          const venue = await app.get(VenueService).create(message.data);
          channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(venue)),
              { correlationId: msg.properties.correlationId }
          );
        }

        if (message.action === 'create_booking') {
          const booking = await app.get(BookingService).create({
            user_id: message.data.user_id,
            venue_id: message.data.venue_id,
            start_time: message.data.start_time,
            end_time: message.data.end_time,
          });
          channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(booking)),
              { correlationId: msg.properties.correlationId }
          );
        }

        if (message.action === 'get_user_bookings') {
          const bookings = await app.get(BookingService).findByUser(message.user_id);
          channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(bookings)),
              { correlationId: msg.properties.correlationId }
          );
        }

        if (message.action === 'cancel_booking') {
          const result = await app.get(BookingService).cancel(message.bookingId);
          channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(result)),
              { correlationId: msg.properties.correlationId }
          );
        }
      } catch (error) {
        console.error('Error processing message:', error.message);
        channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify({ error: error.message })),
            { correlationId: msg.properties.correlationId }
        );
      } finally {
        channel.ack(msg);
      }
    } else {
      console.error('Received null message from queue.');
    }
  });
}

bootstrap();