const TOKEN = "6386674066:AAHcC66wQZqh9iB6RxtWgA-Vtijkv8XSoag";
const TELEGRAM_API = require('node-telegram-bot-api');
const BOT = new TELEGRAM_API(TOKEN, {polling: true});
const API = require('./api');

const Promise = require('bluebird');
Promise.config({
    cancellation: true
});

const start = () => {
    BOT.setMyCommands([
        {command: '/anekdot', description: 'get anekdot'}
    ]);
    
    BOT.on('message', async (message) => {[]
        const TEXT = message.text;
        const CHAT_ID = message.chat.id;

        if(TEXT !== undefined) {
            if(TEXT === '/start') {
                BOT.sendMessage(CHAT_ID, 'hello!');
                return;
            }
    
            if(TEXT === '/anekdot') {
                const ANEKDOT = await API();
                if(ANEKDOT.error === true) {
                    return BOT.sendMessage(CHAT_ID, `error!`)
                }

                if(ANEKDOT.type === 'single') {
                    let response = `${ANEKDOT.joke}\n\n<b>${ANEKDOT.category}</b>`;
                    return BOT.sendMessage(CHAT_ID, response, {parse_mode: 'HTML'});
                } else if(ANEKDOT.type === 'twopart') {
                    let response = `<i>${ANEKDOT.setup}</i>\n\n${ANEKDOT.delivery}\n\n<b>${ANEKDOT.category}</b>`;
                    return BOT.sendMessage(CHAT_ID, response, {parse_mode: 'HTML'});
                }
            }
    
            return BOT.sendMessage(CHAT_ID, `I didn't understand you`);
        }
    });
}

start();