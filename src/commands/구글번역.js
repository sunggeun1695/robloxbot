const Discord = require("discord.js")
const translate = require("@k3rn31p4nic/google-translate-api");
const config = require('../config.json')

module.exports = {
    config: {
        name: "번역",
        description: "번역기 입니다.",
    },
    run: async(bot, message, args) => {
        let language = args[0];
        let text = args.slice(1).join(" ");

        if(!language) return message.channel.send(config.prefix + "번역 [번역할 언어] [바꿀 말]")
        if (language.length !== 2) return message.reply("언어는 별칭 2자 여야합니다. 예시 : `korean > ko`");
        if(!text) return message.reply("무슨 말을 번역하시겠습니까?")
        let em = new Discord.MessageEmbed()
        em.setTitle('번역완료')
        em.setDescription('본 번역기는 구글 번역기를 기반으로 제작되었습니다')
        em.setColor('RANDOM')
        em.addField('입력한 내용', text)
        em.setFooter(bot.user.tag, bot.user.avatarURL({dynamic: true}))
        em.setTimestamp()
        const result = await translate(text, { to:language })
        .then((res) => {
            em.addField('번역 결과', res.text)
            message.channel.send(`<@${message.author.id}>`, {embed: em})
        })
        .catch(err => {
            if(err.code == 404) return message.channel.send(language + '라는 언어는 지원되지 않습니다.')
        })
    }
}