const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "킥",
    aliases: ["추방", "cnqkd", "킥", "ㅏㅑ차"],
    usage: "[id, | mention]",
    category: "moderation",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();

        if (!args[0]) return message.reply('추방할 멤버를 멘션 또는 ID로 적어주세요.');

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ 추방 권한이 필요해요...");
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(`❌ ${bot.user.username}에게 추방 권한이 필요해요...`);

        const toKick = message.guild.members.cache.get(args[0]) || message.mentions.members.first();

        if (!toKick) return message.channel.send('멤버를 찾을 수 없습니다...');

        if (message.author.id === toKick.id) return message.channel.send('자기가 자기를 추방할꺼면 걍 나가세요');
        if (bot.user.id === toKick.id) return message.channel.send(`${bot.user.username}으로 ${bot.user.username}을 추방하려고요...?`);

        if (!toKick.kickable) return message.channel.send('역할이 높아서 추방을 못 하겠네요...');

        const embed = new MessageEmbed().setColor(0xffff00)
            .setThumbnail(toKick.user.displayAvatarURL())
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp()
            .setTitle('멤버 추방')
            .setDescription(stripIndents`**추방된 멤버**\n${toKick}\n\n**추방한 사람**\n${message.author}\n\n**이유**\n${args.slice(1).join(" ") ? args.slice(1).join(" ") : "없움"}`);

        const promtEmbed = new MessageEmbed().setColor(0x00ff00).setDescription(`**${toKick}**님을 추방하실 건가요?`);

        let filter = (reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❎') && user.id === message.author.id;

        message.channel.send(promtEmbed).then(async (msg) => {
            await msg.react('✅');
            await msg.react('❎');

            msg.awaitReactions(filter, {
                max: 1
            }).then((collected) => {
                if (collected.array()[0].emoji.name === '✅') {
                    msg.delete();

                    toKick.kick(args.slice(1).join(" ") || null).catch(err => message.channel.send(`Error...\n${err}`));
    
                    message.channel.send(embed);
                } else {
                    msg.delete();

                    message.channel.send('추방이 취소 되었습니다!');
                };
            });
        });
    }
};