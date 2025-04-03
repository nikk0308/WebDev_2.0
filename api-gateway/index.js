const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib');
const winston = require('winston');

const app = express();
app.use(bodyParser.json());

let channel;
const responseMap = new Map();

// Настройка логгера
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' }),
    ],
});

async function connectRabbitMQ() {
    let connected = false;
    while (!connected) {
        try {
            const connection = await amqp.connect('amqp://guest:guest@127.0.0.1:5672');
            channel = await connection.createChannel();
            await channel.assertQueue('user_service_queue');
            await channel.assertQueue('response_queue');

            channel.consume('response_queue', (msg) => {
                if (msg) {
                    const correlationId = msg.properties.correlationId;
                    const entry = responseMap.get(correlationId);
                    if (entry) {
                        const data = JSON.parse(msg.content.toString());
                        entry.resolve(data);
                        responseMap.delete(correlationId);
                        channel.ack(msg);
                    }
                }
            });

            channel.on('error', (err) => {
                logger.error('Channel error:', err.message);
                connectRabbitMQ(); // Повторное подключение
            });

            channel.on('close', () => {
                logger.error('Channel closed. Reconnecting...');
                connectRabbitMQ(); // Повторное подключение
            });

            connected = true;
            logger.info('Підключено до RabbitMQ');
        } catch (error) {
            logger.error('Помилка підключення до RabbitMQ. Спроба через 5 сек...');
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
}

function sendToRabbitMQ(queue, message, replyTo) {
    const correlationId = Math.random().toString();
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject('Timeout');
            responseMap.delete(correlationId);
        }, 30000);

        responseMap.set(correlationId, { resolve, timeout });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
            correlationId,
            replyTo,
        });
    });
}

app.post('/users/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const message = { action: 'register', data: { name, email, password } };
        const response = await sendToRabbitMQ('user_service_queue', message, 'response_queue');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Помилка сервера: ' + error });
    }
});

// Аналогично реализуйте другие маршруты (/venues, /bookings и т.д.)

connectRabbitMQ().then(() => {
    app.listen(3000, '0.0.0.0', () => {
        logger.info('API Gateway запущено на порті 3000');
    });
});