const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const APITOKEN = "APIKEY_GEMINI";
const TOKEN = "TOKEN_DISCORD";






bot.once('ready', () => {
    console.log('Bot is ready!');
});





bot.on('messageCreate', async (message) => {
    if (!message.author.bot) {
        const userMessage = message.content;


        const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + APITOKEN;
        const data = {
            "contents": [
                {
                    "parts": [
                        { "text": userMessage }
                    ]
                }
            ]
        };


        const response = await axios.post(url, data);
        if (response.status === 200) {
            const text = response.data.candidates[0].content.parts[0].text;
            await message.reply(text); 
        } else {
            console.log("❌ Error:", response.status);
        }

    }
});


bot.login(TOKEN);