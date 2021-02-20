module.exports = {
    name: "뮤트",
    description: "Mute a member from your server",
    
    async run (bot, message, args) {
      if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("권한이 없다");
  
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
      if (!user) message.channel.send(`언급한 사람이 서버에 없습니다...`);
  
      if (user.id === message.author.id) return message.channel.send(`**${bot.author.tag}** 자신이 자신을 뮤트하다니 대단한 녀셕이군`);
  
      let role = message.guild.roles.cache.find(x => x.name === "Muted");
  
      if (!role) return message.channel.send("**Muted** 라는 역할이 없습니다.");

      user.roles.add(role);
  
      await message.channel.send(`${user} 닥쳐라 이 새끼야.`)
    }
  }