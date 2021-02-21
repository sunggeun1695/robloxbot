module.exports = async (bot, oldMessage, newMessage) => {
    if(newMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;
    if(newMessage.channel.guild.name == 'Team Server' && newMessage.channel.name == '💭ㅣ사죄하는-곳') return;
    newMessage.channel.send(`${newMessage.author}님이 \`\`${oldMessage.content}\`\`를 \`\`${newMessage.content}\`\`로 변경하셨습니다.`);
}