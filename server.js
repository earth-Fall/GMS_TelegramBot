'use strict';

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const serverConfig = require("./properties/server.json");

const token = serverConfig.token;

const app = express();

let sendMessageData = {
    start : "Mode : " + serverConfig.mode + "\n" +
        "How to play Grand Master Scam.\n" +
        "Welcome to the Grand Master Scam!\n" +
        "You are now an aspiring scammer set on earning the most tokens possible.\n" +
        "Choose your method of grift. Work with infamous scammers, tap the screen, earn money, pump your passive income, and climb the ranks of world's most notorious scammer society. You'll be rewarded for your efforts once the token is listed (dates to be determined).\n" +
        "Don't forget to bring your friends -- work together to scam the world and get tokens!\n" +
        "And remember, everything is a scam.",
    help : "Mode : " +  serverConfig.mode + "\n" + "How to play Grand Master Scam\n" +
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
};

const startButton = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Play Grand Master Scam',
                    url: serverConfig.game
                }
            ],
            [
                {
                    text: 'Subscribe to the channel',
                    url: serverConfig.channel
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
                    url: serverConfig.game
                }
            ],
            [
                {
                    text: 'Subscribe to the channel',
                    url: serverConfig.channel
                }
            ]
        ]
    }
};

app.set('port', serverConfig.server.port);

let server = app.listen(app.get('port'), '0.0.0.0', async function () {
    console.log("==================================================================================");
    console.log('[' + serverConfig.mode + '] GMS Telegram Bot server listening on port ' + server.address().port + ' AND PID ' + process.pid);
    console.log("==================================================================================");
    const bot = new TelegramBot(token, {polling: true});

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        const startMessage = sendMessageData.start;
        console.log(chatId);
        bot.sendMessage(chatId, startMessage, startButton);
    });

    bot.onText(/\/help/, (msg) => {
        const chatId = msg.chat.id;
        console.log(chatId);

        let htmlMessage = sendMessageData.help;
        bot.sendMessage(chatId, htmlMessage, helpButton);
    });

    bot.on('callback_query', function onCallbackQuery(callbackQuery) {
        const action = callbackQuery.data;
        const msg = callbackQuery.message;
        const chatId = msg.chat.id;
        console.log(chatId);

        let text;

        if (action === 'help') {
            text = sendMessageData.help;
        }

        bot.sendMessage(chatId, text, helpButton);
    });
});
