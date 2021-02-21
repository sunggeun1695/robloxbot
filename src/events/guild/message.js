const message = require("../../../../nodejsbot-master/nodejsbot-master/src/events/guild/message");

module.exports = (bot, message) => {
    const prefix = '.';
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = bot.commands.get(cmd);

    if(command) command.execute(bot, message, args);
}