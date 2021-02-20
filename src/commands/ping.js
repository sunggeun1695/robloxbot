  
const { MessageEmbed } = require('discord.js')
module.exports = {
    name : '핑',
    description : 'Returns latency and API ping',

    /**
     * @param {bot} bot
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(bot, message, args) => {
       const embed = new MessageEmbed()
       .addField(':ping_pong:현재 봇의 핑:', `${bot.ws.ping}ms`)

       message.channel.send(embed)

    }
}