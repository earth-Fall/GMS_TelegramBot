module.exports = {
    apps: [
        {
            name: 'GMS_Telegram_Bot_Server',
            script: 'server.js',
            instances: 1,
            exec_mode: 'fork',
            autorestart: true,
            watch: false
        }
    ]
};