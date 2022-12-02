const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
 } = require('discord.js');
 const {
    Guilds,
    GuildMembers,
    GuildMessages,
    GuildVoiceStates,
    GuildPresences,
    MessageContent,
    GuildMessageReactions,
    GuildMessageTyping,
    DirectMessages,
    DirectMessageReactions,
    DirectMessageTyping,
 } = GatewayIntentBits;
 const { User, Message, ThreadMember, Channel } = Partials;
 
 const client = new Client({
    intents: [
       Guilds,
       GuildMembers,
       GuildMessages,
       GuildVoiceStates,
       GuildPresences,
       MessageContent,
       GuildMessageReactions,
       GuildMessageTyping,
       DirectMessages,
       DirectMessageReactions,
       DirectMessageTyping,
    ],
    partials: [User, Message, ThreadMember, Channel],
 });
 require('dotenv').config();
 
 const { loadEvents } = require('./Handlers/eventHandler');
 
//  const db = require('./Config/connect');
 
 module.exports = client;
 
 client.commands = new Collection();
 client.subCommands = new Collection();
 client.messages = new Collection();
 client.events = new Collection();
 
 loadEvents(client);
//  db.connectDB(process.env.MONGO_URI);
 
 //anti crash
 process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p);
 });
 process.on('uncaughtException', (err, origin) => {
    console.log(err, origin);
 });
 
 client.login(process.env.TOKEN);
 