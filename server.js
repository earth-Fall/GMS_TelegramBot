'use strict';

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');

const token = '7659676861:AAFrDTKfzwjCRoh3U-W6BiE5uwVP4QZamHQ';

const app = express();

let sendMessageData = {
    start : "How to play Grand Master Scam.\n" +
        "Welcome to the Grand Master Scam!\n" +
        "You are now an aspiring scammer set on earning the most tokens possible.\n" +
        "Choose your method of grift. Work with infamous scammers, tap the screen, earn money, pump your passive income, and climb the ranks of world's most notorious scammer society. You'll be rewarded for your efforts once the token is listed (dates to be determined).\n" +
        "Don't forget to bring your friends -- work together to scam the world and get tokens!\n" +
        "And remember, everything is a scam.",
    help : "How to play Grand Master Scam\n" +
        "💰Tap to earn\n" +
        "Tap the screen and collect money.\n" +
        "\n" +
        "💀Earn\n" +
        "Upgrade your scamming skills that give you passive income opportunities.\n" +
        "\n" +
        "⏰Earnings per hour\n" +
        "Your scamming skills will work for you on its own, even when you are not in the game. The earnings only goes up to your Earnings capacity.\n" +
        "\n" +
        "🧑Scammers\n" +
        "As you continue to earn more, you can purchase higher level of Scammers. The higher tier Scammers provide an even higher earnings rate per tap.\n" +
        "\n" +
        "📈Levels\n" +
        "Items in Earn and SpecOps as well as Scammers all have levels. You can spend your money to increase levels of the items and Scammers, which all increase your earnings rate.\n" +
        "\n" +
        "👥Friends\n" +
        "Invite your friends and you'll get bonus rewards. Help a friend become a master scammer and you'll get even more bonuses."
}

const startButton = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Play Grand Master Scam',
                    url: 'https://t.me/grandmasterscam_dev_bot/grandmasterscam_dev'
                }
            ],
            [
                {
                    text: 'Subscribe to the channel',
                    url: 'https://t.me/grandmasterscam_dev_bot/grandmasterscam_dev'
                }
            ],
            [
                {
                    text: 'How to earn from the game',
                    callback_data: 'help'
                }
            ]

        ]
    }
};

const helpButton = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Play Grand Master Scam',
                    url: 'https://t.me/grandmasterscam_dev_bot/grandmasterscam_dev'
                }
            ],
            [
                {
                    text: 'Subscribe to the channel',
                    url: 'https://t.me/grandmasterscam_dev_bot/grandmasterscam_dev'
                }
            ]
        ]
    }
};


let server = app.listen(3000, '0.0.0.0', async function () {
    console.log("==================================================================================");
    console.log('[Start Mode:' + process.env.NODE_ENV + '] GMS server listening on port ' + server.address().port + ' AND PID ' + process.pid);
    //  logger.info('[Start Mode:' + process.env.NODE_ENV + '] GMS server listening on port ' + server.address().port + ' AND PID ' + process.pid);
    console.log("==================================================================================");
    const bot = new TelegramBot(token, {polling: true});

    bot.onText(/\/start/, (msg) => {

        const chatId = msg.chat.id;
        const startMessage = sendMessageData.start;

        bot.sendMessage(chatId, startMessage, startButton);
    });

    bot.onText(/\/help/, (msg) => {
        const chatId = msg.chat.id;
        let htmlMessage = sendMessageData.help;
        bot.sendMessage(chatId, htmlMessage, helpButton);
    });

    bot.on('callback_query', function onCallbackQuery(callbackQuery) {
        const action = callbackQuery.data;
        const msg = callbackQuery.message;
        const chatId = msg.chat.id;
        let text;

        if (action === 'help') {
            text = sendMessageData.help;
        }

        bot.sendMessage(chatId, text, helpButton);
    });

    /*
        bot.onText(/\/echo (.+)/, (msg, match) => {
            // 'msg' is the received Message from Telegram
            // 'match' is the result of executing the regexp above on the text content
            // of the message


            const chatId = msg.chat.id;
            const resp = match[1]; // the captured "whatever"
            console.log(chatId, resp);
            // send back the matched "whatever" to the chat
            bot.sendMessage(chatId, resp);
        });

    // Listen for any kind of message. There are different kinds of
    // messages.

        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            console.log(chatId, 'Message');
            // send a message to the chat acknowledging receipt of their message
            //  bot.sendMessage(chatId, 'Received your message');

            bot.setChatMenuButton( {
                chat_id : chatId,
                menu_button : {
                    text : "Order food",
                    type:"web_app",
                    web_app:{
                        url : "https://tg.elevator.com.et",
                    }
                }
            }   );


            bot.sendMessage(chatId, '테스트입니당!! 테스트 입니당!!3', {
                "reply_markup" : {
                    "inline_keboard" : [
                        [{text : 'A', callback_data : 'AAA'}],
                        [{text : 'B', callback_data : 'BBB'}]
                    ]
                }
            });
        });

         */
});

