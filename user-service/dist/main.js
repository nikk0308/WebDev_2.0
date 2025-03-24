"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const amqp = require("amqplib");
const users_service_1 = require("./users.service");
const venue_service_1 = require("./venue/venue.service");
const booking_service_1 = require("./booking/booking.service");
const common_1 = require("@nestjs/common");
require("reflect-metadata");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();
    app.useGlobalPipes(new common_1.ValidationPipe());
    await channel.assertQueue('user_service_queue');
    await channel.assertQueue('response_queue');
    await app.listen(3000);
    channel.consume('user_service_queue', async (msg) => {
        if (msg) {
            try {
                const message = JSON.parse(msg.content.toString());
                if (message.action === 'register') {
                    const user = await app.get(users_service_1.UsersService).register(message.data);
                    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(user)), { correlationId: msg.properties.correlationId });
                }
                if (message.action === 'create_venue') {
                    const venue = await app.get(venue_service_1.VenueService).create(message.data);
                    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(venue)), { correlationId: msg.properties.correlationId });
                }
                if (message.action === 'create_booking') {
                    const booking = await app.get(booking_service_1.BookingService).create({
                        user_id: message.data.user_id,
                        venue_id: message.data.venue_id,
                        start_time: message.data.start_time,
                        end_time: message.data.end_time,
                    });
                    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(booking)), { correlationId: msg.properties.correlationId });
                }
                if (message.action === 'get_user_bookings') {
                    const bookings = await app.get(booking_service_1.BookingService).findByUser(message.user_id);
                    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(bookings)), { correlationId: msg.properties.correlationId });
                }
                if (message.action === 'cancel_booking') {
                    const result = await app.get(booking_service_1.BookingService).cancel(message.bookingId);
                    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result)), { correlationId: msg.properties.correlationId });
                }
            }
            catch (error) {
                console.error('Error processing message:', error.message);
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ error: error.message })), { correlationId: msg.properties.correlationId });
            }
            finally {
                channel.ack(msg);
            }
        }
        else {
            console.error('Received null message from queue.');
        }
    });
}
bootstrap();
//# sourceMappingURL=main.js.map