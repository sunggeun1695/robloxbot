const { MessageEmbed } = require("discord.js");

module.exports = {
    name: '차단해제',
    run: async (bot, message, args) => {
        if (!args[0]) return message.reply('언밴할 멤버를 ID로 적어주세요. (멘션은 되지 않습니다.)\n(ID는 설정에서 **개발자 모드**로 키신 후 언밴할 멤버의 ID를 복사하면 됩니다.)');

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("❌ 차단 권한이 필요해요...");
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`❌ ${bott.user.username}에게 차단 권한이 필요해요...`);

        if (args[0] === bot.user.id) return message.channel.send(`${bot.user.username}으로 ${bot.user.username}을 언밴하려고요...?`)

        message.guild.members.unban(args[0], args.slice(1).join(" ") || null).then(e => {
            message.channel.send(new MessageEmbed().setTitle('멤버 언밴').setColor(0xffff00).setFooter(e.tag, e.displayAvatarURL()).setDescription(`${e.tag}님이 ${message.guild.name}에서 언밴 처리 되었습니다.`))
        }).catch(e => message.channel.send(`Error...\n${e}`));
    }
};