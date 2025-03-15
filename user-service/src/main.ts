import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as amqp from 'amqplib';
import { UsersService } from './users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const connection = await amqp.connect('amqp://rabbitmq:5672');
  const channel = await connection.createChannel();
  
  await channel.assertQueue('user_service_queue');
  await channel.assertQueue('response_queue');

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
    } catch (error) {
      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(JSON.stringify({ error: error.message })),
        { correlationId: msg.properties.correlationId }
      );
    } finally {
      channel.ack(msg);
    }
  }
});
}
bootstrap();