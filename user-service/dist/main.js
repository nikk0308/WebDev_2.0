"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const amqp = require("amqplib");
const users_service_1 = require("./users.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue('user_service_queue');
    await channel.assertQueue('response_queue');
    channel.consume('user_service_queue', async (msg) => {
        if (msg) {
            try {
                const message = JSON.parse(msg.content.toString());
                if (message.action === 'register') {
                    const user = await app.get(users_service_1.UsersService).register(message.data);
                    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(user)), { correlationId: msg.properties.correlationId });
                }
            }
            catch (error) {
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ error: error.message })), { correlationId: msg.properties.correlationId });
            }
            finally {
                channel.ack(msg);
            }
        }
    });
}
bootstrap();
//# sourceMappingURL=main.js.map