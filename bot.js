const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN; // Храните токен в переменной окружения
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

// Маршрут для обработки обновлений от Telegram
app.post('/webhook', (req, res) => {
    const message = req.body.message;
    if (message && message.text) {
        const chatId = message.chat.id;
        // Обработка команды /start
        if (message.text === '/start') {
            // Отправка приветственного сообщения с кнопкой для запуска Web App
            axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatId,
                text: 'Добро пожаловать в Tapalka Game!',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Запустить игру',
                                web_app: {
                                    url: '<YOUR_WEB_APP_URL>' // URL вашего веб-приложения
                                }
                            }
                        ]
                    ]
                }
            });
        } else {
            // Обработка других сообщений
            axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatId,
                text: 'Пожалуйста, используйте команду /start для начала.'
            });
        }
    }
    res.sendStatus(200);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
