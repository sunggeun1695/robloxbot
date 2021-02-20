const { shorten, custom } = require('isgd');

module.exports = {
    name: "단축",
    usage: ".단축 <URL> [CustomName]",
    category: "command",
    run: async (bot, message, args, ops) => {
        if (!args[0]) return message.channel.send(`**명령어 사용법**\n\`${ops.prefix}단축 <URL> [Custom Name]\``);

        if (!args[1]) shorten(args[0], (res) => message.channel.send(res));
        else custom(args[0], args[1], (res) => message.channel.send(res));
    }
};