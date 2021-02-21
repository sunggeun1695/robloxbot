const fs = require('fs');

module.exports = (bot, Discord) => {
    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')) // js 로 된 확장자 불러오기

    for(const file of command_files) {
        const command = require(`../commands/${file}`);
        if(command.name) {
            bot.commands.set(command.name, command);
        } else {
            continue;
        }
    }
}