const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib');

const app = express();
app.use(bodyParser.json());

let channel;
const responseMap = new Map();

async function connectRabbitMQ() {
    let connected = false;
    while (!connected) {
        try {
            const connection = await amqp.connect('amqp://rabbitmq:5672');
            channel = await connection.createChannel();
            await channel.assertQueue('user_service_queue');
            await channel.assertQueue('response_queue');

            channel.consume('response_queue', (msg) => {
                if (msg) {
                    const correlationId = msg.properties.correlationId;
                    const resolve = responseMap.get(correlationId);
                    if (resolve) {
                        const data = JSON.parse(msg.content.toString());
                        resolve(data);
                        responseMap.delete(correlationId);
                        channel.ack(msg);
                    }
                }
            });

            connected = true;
            console.log('Підключено до RabbitMQ');
        } catch (error) {
            console.error('Помилка підключення до RabbitMQ. Спроба через 5 сек...');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

app.post('/users/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const message = { action: 'register', data: { name, email, password } };
        const correlationId = Math.random().toString();

        const responsePromise = new Promise((resolve, reject) => {
            responseMap.set(correlationId, resolve);
            setTimeout(() => reject('Timeout'), 30000);
        });

        channel.sendToQueue(
            'user_service_queue',
            Buffer.from(JSON.stringify(message)),
            { correlationId, replyTo: 'response_queue' }
        );

        const response = await responsePromise;
        if (response.error) {
            return res.status(500).json(response);
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Помилка сервера: ' + error });
    }
});

connectRabbitMQ().then(() => {
    app.listen(3000, '0.0.0.0', () => {
        console.log('API Gateway запущено на порті 3000');
    });
});