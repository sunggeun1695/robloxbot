const { Message } = require('discord.js')
const noright = '넌 권한이 없어.'

module.exports = {
    name : '구독인증',
    run : async(bot, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`${noright}`)
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send('맨션이 된 사람이 없습니다.') //when no member is pinged
        let role = message.guild.roles.cache.find(r=> r.name === "구독인증")
        //now the code!
        await target.roles.add(role) // adding the role to the user
        message.channel.send(`${target.user.username}님을 구독인증 했어요!`)
    }
}