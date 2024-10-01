require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN; // Храните токен бота в переменной окружения
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = `${process.env.SERVER_URL}${URI}`; // SERVER_URL также будет в переменной окружения

// Маршрут для обработки обновлений от Telegram
app.post(URI, async (req, res) => {
    const update = req.body;

    if (update.message) {
        const chatId = update.message.chat.id;

        if (update.message.text === '/start') {
            // Отправка приветственного сообщения с кнопкой для запуска Web App
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatId,
                text: 'Добро пожаловать в Tapalka Game!',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Запустить игру',
                                web_app: {
                                    url: process.env.WEB_APP_URL // URL вашего веб-приложения
                                }
                            }
                        ]
                    ]
                }
            });
        } else {
            // Обработка других сообщений
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatId,
                text: 'Пожалуйста, используйте команду /start для начала.'
            });
        }
    } else if (update.callback_query) {
        const chatId = update.callback_query.from.id;
        const data = update.callback_query.data; // Данные от Web App

        // Обработка данных от Web App
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: 'Ваш прогресс сохранен!'
        });
    }

    return res.send();
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    // Установка вебхука при запуске сервера
    try {
        await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
        console.log('Webhook was set');
    } catch (error) {
        console.error('Error setting webhook:', error);
    }
});
