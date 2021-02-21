module.exports = {
    name: "언뮤트",
    description: "Unmute a member from your server",
    aliases: ["언뮤", "해방", '죄', '넌 죄가 없다'],

    async run (bot, message, args) {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("ㄷ");

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let role = message.guild.roles.cache.find(x => x.name === "Muted");

        if(user.roles.cache.has(role)) return message.channel.send(`?`);

        user.roles.remove(role);

        message.channel.send(`${user}님 해방 되었어요!`)
    }
}