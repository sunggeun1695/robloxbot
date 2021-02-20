const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const moment = require('moment-timezone');
moment.locale('ko-KR');

module.exports = {
    name: "역할보기",
    category: "information",
    run: async (bot, message, args) => {
        let member = message.guild.members.cache.get(args.join(" "));

        if (!member && message.mentions.members) member = message.mentions.members.first();

        if (!member && args.join(" ")) {
            member = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(args.join(" ")) ||
                member.user.tag.toLowerCase().includes(args.join(" "))
            });
        }

        if (!member) member = message.member;



        const embed2 = new MessageEmbed().setTitle(`${member.user.username}님의 역할 (${member.roles.cache.filter(n => n.id !== message.guild.id).size}개)`).setDescription(`**${member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || "없음"}**`).setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor)

        if (member.roles.cache.size !== 0) message.channel.send(embed2);
    }
};

const status = {
    online: ':green_circle: 온라인',
    idle: ':crescent_moon: 자리 비움',
    dnd: ':no_entry: 다른 용무 중',
    offline: ':white_square_button: 오프라인'
};