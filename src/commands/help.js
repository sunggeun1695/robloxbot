  
const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "도움말",
    aliases: ["ㅗ", "ㅗ디ㅔ", "help", "h"],
    description: "The help command, what do you expect?",

    async run (bot, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('일반명령어')
        .addField('`.핑`', '핑 추출')
        .addField('`.문상`', '문상코드를 생성합니다.')
        .setTimestamp()

        const info = new Discord.MessageEmbed()
        .setTitle('정보 명령어')
        .addField('`.내역할`', '자신의 역할을 확인합니다.')
        .addField('`.봇정보`', '로블이(나)의 정보를 출력합니다.')
        .addField('`.서버정보`', '서버정보를 표시합니다.')
        .setTimestamp()

        const your = new Discord.MessageEmbed()
        .setTitle('자신의 정보 명령어')
        .addField('`.프사`', '자신프사 또는 멘션한 사람의 프사를 볼수 있습니다.')
        .addField('`.유저정보`', '자신의 정보를 볼수 있습니다. (다른사람 정보 보기도 가능)')
        .setTimestamp()

        const admin = new Discord.MessageEmbed()
        .setTitle('어드민 명령어')
        .addField('`.뮤트`', '유저를 뮤트합니다.')
        .addField('`.언뮤트`', '유저를 해방시킵니다.')
        .addField('`.킥`', '유저를 킥합니다.')
        .addField('`.차단`', '유저를 차단 (벤) 합니다.')
        .addField('`.차단해제`', '유저를 차단해제 (벤해제) 합니다.')
        .setTimestamp()

        const youtube = new Discord.MessageEmbed()
        .setTitle('유튜브 명령어')
        .addField('`.강의리스트`', '강의 리스트를 보여줍니다. (강의는 부계로)')
        .setTimestamp()

        const steam = new Discord.MessageEmbed()
        .setTitle('스팀 명령어')
        .addField('`.스팀`', '스팀 게임을 봅니다. (패치됨) (말 그대로 명령어 못씀)')
        .setTimestamp()

        const pp = new Discord.MessageEmbed()
        .setTitle('곧 만들어질 명령어')
        .addField('Coming Soon', '곧 명령어가 생길거임.')
        .setTimestamp()

        const pages = [
                moderation,
                info,
                your,
                admin,
                youtube,
                steam,
                pp
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}

