
const Discord = require('discord.js');
const axios = require('axios')
// const client = new Discord.Client();
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '';

const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('your bot name');
    client.users.cache.find(user => user.id === 'USER-ID')
})

client.on('message', message =>{
    
    if (!message.content.startsWith(prefix) || message.author.bot) return 

    const args = message.content.slice(prefix.length).split(/ +/);
    const command  = args.shift().toLowerCase();

    if (command === 'creator') {
        message.channel.send(`created by <@${message.author.id}>  `);
    }else if (command === 'hello') {
        client.commands.get('hello').execute(message, args)
    }
})

client.login('your token');