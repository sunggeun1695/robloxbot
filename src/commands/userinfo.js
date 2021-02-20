const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const moment = require('moment-timezone');
moment.locale('ko-KR');

module.exports = {
    name: "userinfo",
    aliases: ["정보", "내정보", "user-info", "user-information", "user", "info-user", "user_info", "유저정보", "유저 정보"],
    usage: "[id, | mention]",
    category: "information",
    run: async (client, message, args) => {
        let member = message.guild.members.cache.get(args.join(" "));

        if (!member && message.mentions.members) member = message.mentions.members.first();

        if (!member && args.join(" ")) {
            member = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(args.join(" ")) ||
                member.user.tag.toLowerCase().includes(args.join(" "))
            });
        }

        if (!member) member = message.member;

        const embed = new MessageEmbed().setTitle(`${member.user.username}님의 정보`).setFooter(member.user.username, member.user.displayAvatarURL()).setThumbnail(member.user.displayAvatarURL()).setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor).setTimestamp()
            .addField(`${client.emojis.cache.find(x => x.name == ":discord:")} 유저 이름`, `**${member.user.username}**`)
            .addField(`${client.emojis.cache.find(x => x.name == ":discord:")} 디스플레이 이름`, stripIndents`**${member.displayName}**`)
            .addField(`${client.emojis.cache.find(x => x.name == ":discord:")} 디스코드 태그`, `**${member.user.tag}**`)
            .addField('🆔 ID', stripIndents`**${member.user.id}**`)

        if (member.user.presence.status !== "offline" && member.user.bot === false) {
            if (member.user.presence.clientStatus.desktop) {
                embed.addField(`${client.emojis.cache.find(x => x.name == "discord")} 디스코드 클라이언트`, `**🖥 디스코드 앱**`)
            } else if (member.user.presence.clientStatus.web) {
                embed.addField(`${client.emojis.cache.find(x => x.name == "discord")} 디스코드 클라이언트`, `**⌨ 웹**`)
            } else if (member.user.presence.clientStatus.mobile) {
                embed.addField(`${client.emojis.cache.find(x => x.name == "discord")} 디스코드 클라이언트`, `**📱 모바일**`)
            }
        }

        embed.addField('상태', `**오프라인**`)
            .addField('📥 서버에 들어온 날짜', `**${moment(member.joinedAt).tz('Asia/seoul').format('YYYY년 MM월 DD일 dd요일 HH시 mm분')}**`)
            .addField('📥 디스코드 가입 날짜', `**${moment(member.user.createdAt).tz('Asia/seoul').format('YYYY년 MM월 DD일 dd요일 HH시 mm분')}**`)

        const embed2 = new MessageEmbed().setTitle(`${member.user.username}님의 역할 (${member.roles.cache.filter(n => n.id !== message.guild.id).size}개)`).setDescription(`**${member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || "없음"}**`).setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor)

        message.channel.send(embed);
        if (member.roles.cache.size !== 0) message.channel.send(embed2);
    }
};

