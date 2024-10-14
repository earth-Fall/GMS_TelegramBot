'use strict';

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');

const token = '7659676861:AAFrDTKfzwjCRoh3U-W6BiE5uwVP4QZamHQ';

const app = express();

let server = app.listen(3000, '0.0.0.0', async function () {
    console.log("==================================================================================");
    console.log('[Start Mode:' + process.env.NODE_ENV + '] GMS server listening on port ' + server.address().port + ' AND PID ' + process.pid);
    //  logger.info('[Start Mode:' + process.env.NODE_ENV + '] GMS server listening on port ' + server.address().port + ' AND PID ' + process.pid);
    console.log("==================================================================================");
    const bot = new TelegramBot(token, {polling: true});


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
        /*
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
         */

        bot.sendMessage(chatId, '테스트입니당!! 테스트 입니당!!');
    });
});

