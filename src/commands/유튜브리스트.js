const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "강의리스트",
  category: "info",
  description: "Get the youngest account creation date in the guild!",
  run: async (bot, message, args) => {

        
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('유튜브 강의리스트')
            .addField('[디스코드] 디스코드 봇 만들기 1화 봇 기본세팅', 'https://youtu.be/6289SVNX2Qo')

            


        
    
            
            
    
            
            
            message.channel.send(embed);
        }
    }