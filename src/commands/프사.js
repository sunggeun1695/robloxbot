const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "프사",
    usage: "[id, | mention]",
    category: "command",
    run: async (bot, message, args) => {
        let member = message.guild.members.cache.get(args.join(" "));

        if (!member && message.mentions.members) member = message.mentions.members.first();

        if (!member && args.join(" ")) {
            member = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(args.join(" ")) || member.user.username.toLowerCase().includes(args.join(" ")) || member.user.tag.toLowerCase().includes(args.join(" "));
            });
        };

        if (!member) member = message.member;

        message.channel.send(new MessageEmbed().setColor(0xfffffe).setTitle(`${member.user.username}님의 프로필 사진`).setURL(member.user.displayAvatarURL({dynamic: true, format: 'png', size: 1024})).setImage(member.user.displayAvatarURL({dynamic: true, format: 'png', size: 1024})));
    }
};